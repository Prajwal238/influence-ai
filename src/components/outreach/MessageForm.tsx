
import { useState } from "react";
import TemplateSelector from "./TemplateSelector";
import MessageTypeToggle from "./MessageTypeToggle";
import TextMessageEditor from "./TextMessageEditor";
import VoiceMessageEditor from "./VoiceMessageEditor";
import LanguageSelector from "./LanguageSelector";
import { useMessageGeneration } from "./MessageGenerationHandler";

interface MessageFormProps {
  message: string;
  onMessageChange: (message: string) => void;
  selectedPlatform: string;
}

const MessageForm = ({
  message,
  onMessageChange,
  selectedPlatform
}: MessageFormProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState("first-reach");
  const [voiceMessage, setVoiceMessage] = useState("");
  const [voiceLanguage, setVoiceLanguage] = useState("english");
  const [sendAsVoice, setSendAsVoice] = useState(false);
  const [selectedTargetLanguage, setSelectedTargetLanguage] = useState("english");

  const { isGenerating, handleGenerateWithAI } = useMessageGeneration({
    sendAsVoice,
    selectedPlatform,
    selectedTemplate,
    selectedTargetLanguage,
    onMessageChange,
    onVoiceMessageChange: setVoiceMessage
  });

  const handleLanguageChange = (language: string) => {
    setSelectedTargetLanguage(language);
  };

  const getContentForValidation = () => {
    return sendAsVoice ? voiceMessage.trim() : message.trim();
  };

  return {
    // Form state
    selectedTemplate,
    setSelectedTemplate,
    voiceMessage,
    setVoiceMessage,
    voiceLanguage,
    setVoiceLanguage,
    sendAsVoice,
    setSendAsVoice,
    selectedTargetLanguage,
    handleLanguageChange,
    
    // Generation state
    isGenerating,
    handleGenerateWithAI,
    
    // Validation
    getContentForValidation,
    
    // Components JSX
    renderForm: () => (
      <>
        <TemplateSelector 
          selectedTemplate={selectedTemplate}
          onTemplateChange={setSelectedTemplate}
        />

        <MessageTypeToggle 
          sendAsVoice={sendAsVoice}
          onToggle={setSendAsVoice}
        />

        {!sendAsVoice && (
          <TextMessageEditor
            message={message}
            onMessageChange={onMessageChange}
            selectedPlatform={selectedPlatform}
            onGenerateWithAI={handleGenerateWithAI}
            isGenerating={isGenerating}
          />
        )}

        {sendAsVoice && (
          <VoiceMessageEditor
            voiceMessage={voiceMessage}
            onVoiceMessageChange={setVoiceMessage}
            voiceLanguage={voiceLanguage}
            onVoiceLanguageChange={setVoiceLanguage}
            selectedPlatform={selectedPlatform}
            onGenerateWithAI={handleGenerateWithAI}
            isGenerating={isGenerating}
          />
        )}

        <LanguageSelector
          selectedLanguage={selectedTargetLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </>
    )
  };
};

export default MessageForm;
