"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-dark.css";
import { differenceInSeconds } from "date-fns";

export function CountdownTimer() {
  const { t } = useLanguage();
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  // Set default date to tomorrow at current time
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setTargetDate(tomorrow);
  }, []);

  // Update remaining time every second
  useEffect(() => {
    if (!isCountingDown || !targetDate) return;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const totalSeconds = Math.max(0, differenceInSeconds(targetDate, now));
      
      if (totalSeconds <= 0) {
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      setRemainingTime({ days, hours, minutes, seconds });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [isCountingDown, targetDate]);

  const startCountdown = () => {
    if (targetDate) {
      setIsCountingDown(true);
      setIsEditing(false);
    }
  };

  const resetCountdown = () => {
    setIsCountingDown(false);
    setIsEditing(true);
  };

  const formatTimeUnit = (unit: number, label: string) => {
    return (
      <div className="flex flex-col items-center justify-center px-4">
        <motion.div
          key={unit}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-mono font-bold"
        >
          {unit.toString().padStart(2, "0")}
        </motion.div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="editing"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg overflow-hidden">
                <CardContent className="flex flex-col p-6 space-y-4">
                  <h3 className="text-lg font-medium text-center">
                    {t('selectDateTime')}
                  </h3>
                  <div className="flex flex-col space-y-4 items-center justify-center">
                    <DatePicker
                      selected={targetDate}
                      onChange={(date) => setTargetDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      minDate={new Date()}
                      calendarStartDay={1}
                      className="w-full p-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded-md text-center"
                      calendarClassName="!bg-gray-800 !text-white !border !border-gray-600"
                      popperClassName="!shadow-lg"
                      dayClassName={(date) =>
                        date.toDateString() === targetDate?.toDateString()
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-600 text-white'
                      }
                      timeClassName={() => 'hover:bg-gray-600 text-white'}
                    />
                    <Button
                      onClick={startCountdown}
                      size="lg"
                      className="w-full"
                      disabled={!targetDate}
                    >
                      {t('startCountdown')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="countdown"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4 items-center">
                    <h3 className="text-lg font-medium text-center">
                      {t('timeRemaining')}
                    </h3>
                    
                    {remainingTime && (
                      <motion.div 
                        className="flex justify-center items-center space-x-2 py-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {formatTimeUnit(remainingTime.days, t('days'))}
                        <span className="text-2xl font-bold">:</span>
                        {formatTimeUnit(remainingTime.hours, t('hours'))}
                        <span className="text-2xl font-bold">:</span>
                        {formatTimeUnit(remainingTime.minutes, t('minutes'))}
                        <span className="text-2xl font-bold">:</span>
                        {formatTimeUnit(remainingTime.seconds, t('seconds'))}
                      </motion.div>
                    )}
                    
                    <div className="flex space-x-4">
                      <Button
                        onClick={resetCountdown}
                        variant="outline"
                        className="flex-1"
                      >
                        {t('edit')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 