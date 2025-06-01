
import { useState } from "react";
import TemplateSelector from "./TemplateSelector";
import MessageTypeToggle, { MessageType } from "./MessageTypeToggle";
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
  const [messageType, setMessageType] = useState<MessageType>("text");
  const [selectedTargetLanguage, setSelectedTargetLanguage] = useState("english");

  const { isGenerating, handleGenerateWithAI } = useMessageGeneration({
    messageType,
    selectedPlatform,
    selectedTemplate,
    selectedTargetLanguage,
    onMessageChange,
    onVoiceMessageChange: setVoiceMessage,
    onVideoScriptChange: () => {} // No longer needed but keeping for compatibility
  });

  const handleLanguageChange = (language: string) => {
    setSelectedTargetLanguage(language);
  };

  const getContentForValidation = () => {
    switch (messageType) {
      case "voice":
        return voiceMessage.trim();
      default:
        return message.trim();
    }
  };

  return {
    // Form state
    selectedTemplate,
    setSelectedTemplate,
    voiceMessage,
    setVoiceMessage,
    voiceLanguage,
    setVoiceLanguage,
    messageType,
    setMessageType,
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
          messageType={messageType}
          onTypeChange={setMessageType}
        />

        {messageType === "text" && (
          <TextMessageEditor
            message={message}
            onMessageChange={onMessageChange}
            selectedPlatform={selectedPlatform}
            onGenerateWithAI={handleGenerateWithAI}
            isGenerating={isGenerating}
          />
        )}

        {messageType === "voice" && (
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
