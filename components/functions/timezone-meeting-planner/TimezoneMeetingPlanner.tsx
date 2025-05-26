"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { DateTime } from "luxon";

interface TimeZoneParticipant {
  id: string;
  name: string;
  timezone: string;
}

export function TimezoneMeetingPlanner() {
  const { t } = useLanguage();
  const [participants, setParticipants] = useState<TimeZoneParticipant[]>([]);
  const [newParticipantName, setNewParticipantName] = useState("");
  const [newParticipantTimezone, setNewParticipantTimezone] = useState("");
  const [meetingTime, setMeetingTime] = useState(12); // Default to noon
  const [availableTimezones, setAvailableTimezones] = useState<string[]>([]);
  
  // Initialize with some default participants if list is empty
  useEffect(() => {
    if (participants.length === 0) {
      setParticipants([
        { id: "1", name: "San Francisco", timezone: "America/Los_Angeles" },
        { id: "2", name: "New York", timezone: "America/New_York" },
        { id: "3", name: "London", timezone: "Europe/London" },
        { id: "4", name: "Tokyo", timezone: "Asia/Tokyo" }
      ]);
    }
  }, [participants.length]);

  // Get list of timezones
  useEffect(() => {
    // Using Luxon's built-in zones
    const zones = DateTime.now().zoneName ? [DateTime.now().zoneName] : [];
    
    // Add common timezones
    const commonZones = [
      "America/Los_Angeles", 
      "America/Denver", 
      "America/Chicago", 
      "America/New_York", 
      "Europe/London", 
      "Europe/Paris", 
      "Europe/Berlin", 
      "Europe/Moscow", 
      "Asia/Dubai", 
      "Asia/Singapore", 
      "Asia/Tokyo", 
      "Asia/Shanghai", 
      "Australia/Sydney", 
      "Pacific/Auckland"
    ];
    
    setAvailableTimezones([...new Set([...zones, ...commonZones].sort())]);
  }, []);

  const addParticipant = () => {
    if (newParticipantName && newParticipantTimezone) {
      const newParticipant: TimeZoneParticipant = {
        id: Date.now().toString(),
        name: newParticipantName,
        timezone: newParticipantTimezone
      };
      
      setParticipants([...participants, newParticipant]);
      setNewParticipantName("");
      setNewParticipantTimezone("");
    }
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  // Calculate local times for all participants
  const getLocalTimes = () => {
    const now = DateTime.now().set({ hour: meetingTime, minute: 0, second: 0 });
    
    return participants.map(participant => {
      const zonedTime = now.setZone(participant.timezone);
      
      // Determine if this time is outside of working hours (9am-5pm)
      const hour = zonedTime.hour;
      const isWorkHours = hour >= 9 && hour < 17;
      
      // Determine if it's night time (11pm-6am)
      const isNightTime = hour >= 23 || hour < 6;
      
      return {
        ...participant,
        time: zonedTime.toFormat("HH:mm"),
        dateStr: zonedTime.toFormat("ccc, LLL d"),
        isWorkHours,
        isNightTime,
        zonedDateTime: zonedTime
      };
    });
  };

  const formatReferenceTime = () => {
    const now = DateTime.now().set({ hour: meetingTime, minute: 0, second: 0 });
    return now.toFormat("HH:mm");
  };

  const localTimes = getLocalTimes();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('timezoneMeetingPlanner')}</CardTitle>
        <CardDescription>
          {t('timezoneMeetingPlannerDescription')}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Meeting time slider */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">{t('meetingTime')}: <span className="font-bold">{formatReferenceTime()}</span></h3>
          <Slider
            value={[meetingTime]}
            min={0}
            max={23}
            step={1}
            onValueChange={(value) => setMeetingTime(value[0])}
            className="w-full"
          />
        </div>

        {/* Participant times grid */}
        <div className="grid gap-4">
          <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2 font-medium border-b pb-2">
            <div>{t('participant')}</div>
            <div>{t('date')}</div>
            <div>{t('time')}</div>
            <div></div>
          </div>

          {localTimes.map((participant) => (
            <div 
              key={participant.id} 
              className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <span>{participant.name}</span>
                <span className="text-sm text-muted-foreground">({participant.timezone})</span>
              </div>
              <div className="text-sm">{participant.dateStr}</div>
              <div>
                <Badge 
                  variant={participant.isWorkHours ? "default" : participant.isNightTime ? "destructive" : "secondary"}
                  className="font-mono"
                >
                  {participant.time}
                </Badge>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => removeParticipant(participant.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add new participant */}
        <div className="border-t pt-4 mt-4">
          <h3 className="text-md font-medium mb-2">{t('addParticipant')}</h3>
          <div className="flex gap-2 flex-wrap">
            <Input
              className="max-w-[200px]"
              placeholder={t('participantName')}
              value={newParticipantName}
              onChange={(e) => setNewParticipantName(e.target.value)}
            />
            
            <Select
              value={newParticipantTimezone}
              onValueChange={setNewParticipantTimezone}
            >
              <SelectTrigger className="min-w-[240px] max-w-[300px]">
                <SelectValue placeholder={t('selectTimezone')} />
              </SelectTrigger>
              <SelectContent>
                {availableTimezones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={addParticipant} disabled={!newParticipantName || !newParticipantTimezone}>
              <Plus className="h-4 w-4 mr-1" />
              {t('add')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 