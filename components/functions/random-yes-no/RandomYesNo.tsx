"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";

export function RandomYesNo() {
  const { t } = useLanguage();
  const [seconds, setSeconds] = useState(3);
  const [remaining, setRemaining] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const startCountdown = () => {
    setResult(null);
    setRemaining(seconds);
    setIsRunning(true);
    setShowConfetti(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && remaining > 0) {
      timer = setTimeout(() => setRemaining(remaining - 1), 1000);
    } else if (isRunning && remaining === 0) {
      setIsRunning(false);
      const newResult = Math.random() < 0.5 ? t('yes') : t('no');
      setResult(newResult);
      if (newResult === t('yes')) {
        setShowConfetti(true);
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, remaining, t]);

  const confettiProps = {
    force: 0.6,
    duration: 2500,
    particleCount: 80,
    width: 1000,
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {result !== null ? (
            <motion.div
              key="result"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center mb-8"
            >
              {showConfetti && <ConfettiExplosion {...confettiProps} />}
              <Card className="w-full shadow-lg overflow-hidden">
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`text-5xl font-bold mb-6 ${result === t('yes') ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {result}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={startCountdown}
                      size="lg"
                      className="px-8"
                    >
                      {t('repeat')}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="countdown"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center mb-8"
            >
              <Card className="w-full shadow-lg overflow-hidden">
                <CardContent className="flex flex-col items-center justify-center p-8">
                  {isRunning ? (
                    <motion.div
                      key={remaining}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-5xl font-mono font-bold mb-6"
                    >
                      {remaining}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-2xl font-medium mb-6"
                    >
                      {t('start')}
                    </motion.div>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={startCountdown}
                      size="lg"
                      className="px-8"
                      disabled={isRunning}
                    >
                      {isRunning ? t('seconds') : t('start')}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Card className="w-full max-w-md">
        <CardContent className="flex items-center gap-4 p-6">
          <input
            type="range"
            min={3}
            max={10}
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            className="flex-1"
            disabled={isRunning}
          />
          <span className="min-w-16 text-right">
            {seconds} {t('seconds')}
          </span>
        </CardContent>
      </Card>
    </div>
  );
} 