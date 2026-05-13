import React, { useEffect, useState } from 'react';
import { Power, RotateCcw, X } from 'lucide-react';

type ShutdownMode = 'shutdown' | 'restart';
type ShutdownStep = 'choose' | 'closing' | 'shutdown' | 'restart';

interface ShutdownDialogProps {
  onCancel: () => void;
  onBeginPowerAction: () => Promise<void>;
  onShutdownComplete: () => void;
  onRestartComplete: () => void;
}

export const ShutdownDialog: React.FC<ShutdownDialogProps> = ({
  onCancel,
  onBeginPowerAction,
  onShutdownComplete,
  onRestartComplete
}) => {
  const [step, setStep] = useState<ShutdownStep>('choose');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && step === 'choose') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel, step]);

  useEffect(() => {
    if (step === 'shutdown') {
      const timer = window.setTimeout(onShutdownComplete, 2600);
      return () => window.clearTimeout(timer);
    }

    if (step === 'restart') {
      const timer = window.setTimeout(onRestartComplete, 4300);
      return () => window.clearTimeout(timer);
    }
  }, [onRestartComplete, onShutdownComplete, step]);

  const beginPowerAction = async (mode: ShutdownMode) => {
    setStep('closing');
    await onBeginPowerAction();
    setStep(mode === 'restart' ? 'restart' : 'shutdown');
  };

  if (step === 'closing') return null;

  if (step !== 'choose') {
    return (
      <div className="absolute inset-0 z-[20000] bg-black text-white">
        <div className="h-full w-full flex items-center justify-center bg-[#008080] px-6">
          {step === 'shutdown' && (
            <div className="text-center font-serif">
              <div className="text-xl md:text-3xl mb-8">Windows is shutting down</div>
              <div className="text-sm md:text-base">Please wait while your computer shuts down.</div>
            </div>
          )}

          {step === 'restart' && (
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
              <div className="font-serif text-xl md:text-3xl mb-8">Windows is shutting down</div>
              <div className="mt-10 w-full max-w-[360px]">
                <div className="h-4 bg-black border border-white overflow-hidden">
                  <div className="h-full w-2/3 bg-white animate-pulse" />
                </div>
                <div className="mt-4 text-sm">Restarting ToanOS...</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-[20000] flex items-center justify-center bg-black/25 px-3">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="shutdown-title"
        className="w-full max-w-[420px] bg-[#c0c0c0] p-[3px] bevel-window shadow-2xl"
      >
        <div className="h-6 px-1 flex items-center justify-between bg-gradient-to-r from-[#008080] to-[#1084d0] text-white">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src="https://win98icons.alexmeub.com/icons/png/shut_down_cool-0.png"
              alt=""
              className="w-4 h-4 flex-shrink-0"
            />
            <span id="shutdown-title" className="text-xs font-bold truncate">
              Shut Down ToanOS
            </span>
          </div>
          <button
            onClick={onCancel}
            className="w-4 h-4 bg-[#c0c0c0] bevel-out flex items-center justify-center active:bevel-in"
            aria-label="Close shutdown dialog"
          >
            <X className="w-3 h-3 text-black" />
          </button>
        </div>

        {step === 'choose' && (
          <div className="p-4 text-black">
            <div className="flex gap-4">
              <img
                src="https://win98icons.alexmeub.com/icons/png/computer_2-0.png"
                alt=""
                className="w-12 h-12 flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-bold mb-2">What do you want the computer to do?</p>
                <p className="text-xs leading-5">
                  Choose an option below, then click the matching button.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => beginPowerAction('shutdown')}
                className="h-9 px-3 bg-[#c0c0c0] bevel-out active:bevel-in flex items-center justify-center gap-2 text-xs font-bold"
              >
                <Power className="w-4 h-4" />
                Shut Down
              </button>
              <button
                onClick={() => beginPowerAction('restart')}
                className="h-9 px-3 bg-[#c0c0c0] bevel-out active:bevel-in flex items-center justify-center gap-2 text-xs font-bold"
              >
                <RotateCcw className="w-4 h-4" />
                Restart
              </button>
              <button
                onClick={onCancel}
                className="h-9 px-3 bg-[#c0c0c0] bevel-out active:bevel-in text-xs font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
