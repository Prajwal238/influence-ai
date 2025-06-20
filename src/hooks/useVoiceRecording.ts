
import { useState, useRef, useCallback } from 'react';
import { apiClient } from '@/utils/apiClient';
import { generateSessionId } from '@/components/agents/sessionUtils';

interface UseVoiceRecordingProps {
  sessionId?: string;
  agentType?: string;
}

export const useVoiceRecording = ({ sessionId, agentType = 'campaign' }: UseVoiceRecordingProps = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await sendAudioToAPI(audioBlob);
        
        // Clean up
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        setIsProcessing(false);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Auto-stop after 45 seconds
      timeoutRef.current = setTimeout(() => {
        stopRecording();
      }, 45000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      setIsRecording(false);
      setIsProcessing(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      setIsProcessing(true);
      mediaRecorderRef.current.stop();
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [isRecording]);

  const sendAudioToAPI = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice-message.webm');

      // Use the provided sessionId, or generate a new one if none exists
      let currentSessionId = sessionId;
      
      // Only generate a new sessionId if none is provided at all
      if (!currentSessionId) {
        currentSessionId = generateSessionId();
        localStorage.setItem(`current-session-${agentType}`, currentSessionId);
        console.log('Generated new sessionId for voice message:', currentSessionId);
      } else {
        console.log('Using existing sessionId for voice message:', currentSessionId);
      }

      const endpoint = `/api/campaigns/voiceMessage?sessionId=${currentSessionId}`;
      await apiClient.post(endpoint, formData);
      console.log('Voice message sent successfully');
    } catch (error) {
      console.error('Error sending voice message:', error);
    }
  };

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  return {
    isRecording,
    isProcessing,
    toggleRecording
  };
};
