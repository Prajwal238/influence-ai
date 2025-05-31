
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
  const [selectedTargetLanguages, setSelectedTargetLanguages] = useState<string[]>(["english"]);

  const { isGenerating, handleGenerateWithAI } = useMessageGeneration({
    sendAsVoice,
    selectedPlatform,
    onMessageChange,
    onVoiceMessageChange: setVoiceMessage
  });

  const handleLanguageToggle = (language: string) => {
    setSelectedTargetLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
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
    selectedTargetLanguages,
    handleLanguageToggle,
    
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
          selectedLanguages={selectedTargetLanguages}
          onLanguageToggle={handleLanguageToggle}
        />
      </>
    )
  };
};

export default MessageForm;
