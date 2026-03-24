"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Wind, Thermometer, Droplets, Sun, MapPin, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EnvironmentResponse {
  region: string;
  temperature: number;
  humidity: number;
  pm10: number;
  pm25: number;
  precipitation: boolean;
  walkable: boolean;
  status: string;
  message: string;
}

interface EnvItem {
  icon: any;
  label: string;
  value: string;
  color: string;
  bgColor: string;
}

export function EnvironmentCards() {
  const [data, setData] = useState<EnvItem[]>([]);
  const [regionName, setRegionName] = useState("");
  const [rawMessage, setRawMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocationAndFetch = () => {
      if (!navigator.geolocation) {
        setError("위치 정보를 지원하지 않는 브라우저입니다.");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchEnvironmentData(latitude, longitude);
        },
        (err) => {
          console.error("위치 획득 실패:", err);
          setError("위치 권한을 허용해주세요.");
          setLoading(false);
        }
      );
    };

    const fetchEnvironmentData = async (lat: number, lng: number) => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get<EnvironmentResponse>(
          `http://localhost:8080/api/dashboard/environment?lat=${lat}&lng=${lng}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const res = response.data;
        setRegionName(res.region);
        setRawMessage(res.message);

        const mappedData: EnvItem[] = [
          {
            icon: Wind,
            label: "미세먼지",
            value: `${res.status === "GOOD" ? "좋음" : res.status === "BAD" ? "나쁨" : "보통"} (${res.pm10}㎍/㎥)`,
            color: res.status === "GOOD" ? "text-blue-500" : res.status === "BAD" ? "text-red-500" : "text-amber-500",
            bgColor: res.status === "GOOD" ? "bg-blue-50" : res.status === "BAD" ? "bg-red-50" : "bg-amber-50",
          },
          {
            icon: Thermometer,
            label: "기온",
            value: `${res.temperature}°C`,
            color: "text-primary",
            bgColor: "bg-primary/10",
          },
          {
            icon: Droplets,
            label: "습도",
            value: `${res.humidity}%`,
            color: "text-accent",
            bgColor: "bg-accent/10",
          },
          {
            icon: Sun,
            label: "산책 추천",
            value: res.walkable ? "추천" : "비추천",
            color: res.walkable ? "text-green-600" : "text-red-500",
            bgColor: res.walkable ? "bg-green-50" : "bg-red-50",
          },
        ];

        setData(mappedData);
      } catch (err: any) {
        console.error("환경 정보 로드 실패:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    getLocationAndFetch();
  }, []);

  if (loading) return <div className="p-8 text-center animate-pulse text-muted-foreground">현재 위치 환경 분석 중...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            현재 산책 환경
            {regionName && (
              <span className="text-sm font-normal text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {regionName}
              </span>
            )}
          </h2>
        </div>
        {rawMessage && (
          <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 w-fit px-2.5 py-1 rounded-md border border-amber-100">
            <AlertCircle className="w-3.5 h-3.5" />
            {rawMessage}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {data.map((item) => (
          <Card key={item.label} className="border-0 shadow-sm transition-all overflow-hidden">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center gap-2 md:gap-3">
                <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 ${item.bgColor}`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                
                <div className="flex flex-col min-w-0">
                  <p className="text-[10px] md:text-xs text-muted-foreground leading-tight">
                    {item.label}
                  </p>
                  <p className={`font-bold ${item.color} 
                    text-[13px] sm:text-sm md:text-base lg:text-lg
                    whitespace-nowrap`}>
                    {item.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}