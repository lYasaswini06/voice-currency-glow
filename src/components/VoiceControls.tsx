
import { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeech } from '@/hooks/useSpeech';

export const VoiceControls = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  
  const { startListening, stopListening, transcript, isSupported } = useSpeechRecognition();
  const { speak, isSpeaking } = useSpeech();

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      setIsListening(false);
    } else {
      startListening();
      setIsListening(true);
    }
  };

  const testSpeech = () => {
    speak("Voice controls are working perfectly. You can now speak your conversion requests.");
  };

  if (!isSupported) {
    return (
      <div className="bg-theme-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-theme-primary/10">
        <div className="text-center text-theme-text-secondary">
          <MicOff className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Voice controls not supported in this browser</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-theme-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-theme-primary/10 theme-transition">
      <h3 className="text-lg font-semibold text-theme-text mb-4 flex items-center gap-2">
        <Mic className="w-5 h-5 text-theme-primary" />
        Voice Controls
      </h3>

      <div className="space-y-4">
        {/* Voice Input */}
        <div className="space-y-2">
          <button
            onClick={handleVoiceToggle}
            className={`w-full flex items-center justify-center gap-3 p-4 rounded-2xl font-medium theme-transition ${
              isListening
                ? 'bg-red-500/20 text-red-600 border-2 border-red-500/30 animate-voice-pulse'
                : 'bg-theme-primary/10 text-theme-primary border-2 border-theme-primary/20 hover:bg-theme-primary/20'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            {isListening ? 'Stop Listening' : 'Start Voice Input'}
          </button>

          {transcript && (
            <div className="bg-theme-bg/50 rounded-xl p-3 border border-theme-primary/10">
              <p className="text-sm text-theme-text-secondary">Heard:</p>
              <p className="text-theme-text font-medium">{transcript}</p>
            </div>
          )}
        </div>

        {/* Speech Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-theme-text">Speech Output</span>
            <button
              onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
              className="p-2 rounded-lg theme-transition hover:bg-theme-primary/10"
            >
              {isSpeechEnabled ? (
                <Volume2 className="w-4 h-4 text-theme-primary" />
              ) : (
                <VolumeX className="w-4 h-4 text-theme-text-secondary" />
              )}
            </button>
          </div>

          <button
            onClick={testSpeech}
            disabled={isSpeaking}
            className="w-full p-3 bg-theme-accent/10 text-theme-accent border border-theme-accent/20 rounded-xl hover:bg-theme-accent/20 theme-transition disabled:opacity-50"
          >
            {isSpeaking ? 'Speaking...' : 'Test Speech'}
          </button>
        </div>

        {/* Voice Commands Help */}
        <div className="bg-theme-bg/30 rounded-xl p-3 border border-theme-primary/10">
          <p className="text-xs text-theme-text-secondary mb-2 font-medium">Voice Commands:</p>
          <ul className="text-xs text-theme-text-secondary space-y-1">
            <li>• "Convert 100 dollars to euros"</li>
            <li>• "Exchange 50 pounds to yen"</li>
            <li>• "How much is 25 Canadian dollars in Indian rupees"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
