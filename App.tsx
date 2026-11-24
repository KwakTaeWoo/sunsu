import { useState, type FormEvent } from 'react';
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Download,
  Loader2,
  MapPin,
  RefreshCw,
  Search,
  Sun,
  Wind,
} from 'lucide-react';
import { WeatherBackdrop } from './WeatherBackdrop.tsx';
import { WEATHER_THEMES } from './weatherThemes.ts';
import { recommendDinnerMenus } from './menuRecommender.ts';
import { downloadProjectZip } from './exportZip.ts';
import type { RecommendationResponse, WeatherCondition } from './types.ts';

const QUICK_REGIONS = ['목포', '서울', '부산', '제주', '강릉'];

function WeatherIcon({ condition, className }: { condition: WeatherCondition; className?: string }) {
  switch (condition) {
    case 'clear':
      return <Sun className={className} aria-hidden="true" />;
    case 'rain':
      return <CloudRain className={className} aria-hidden="true" />;
    case 'snow':
      return <CloudSnow className={className} aria-hidden="true" />;
    case 'cloudy':
      return <Cloud className={className} aria-hidden="true" />;
    case 'windy':
      return <Wind className={className} aria-hidden="true" />;
  }
}

export default function App() {
  const [regionInput, setRegionInput] = useState<string>('목포');
  const [activeRegion, setActiveRegion] = useState<string>('목포');
  const [excludedMenus, setExcludedMenus] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState<boolean>(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const weatherKey = recommendation?.weatherCondition ?? 'default';
  const theme = WEATHER_THEMES[weatherKey];

  async function fetchRecommendation(targetRegion: string, excludeList: string[], refreshing: boolean) {
    const cleanRegion = targetRegion.trim() || '목포';
    setErrorMessage(null);
    setIsLoading(true);
    setIsRefreshing(refreshing);

    try {
      const payload = await recommendDinnerMenus(cleanRegion, excludeList);
      setRecommendation(payload);
      setActiveRegion(payload.region);
      const newlyAdded = payload.menus.map((m) => m.name);
      setExcludedMenus([...excludeList, ...newlyAdded]);
    } catch (error) {
      const rawMessage = error instanceof Error ? error.message : '';
      const message = rawMessage.includes('잠시 후 다시 시도해 주세요')
        ? rawMessage
        : '날씨 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;
    const cleanRegion = regionInput.trim() || '목포';
    setRegionInput(cleanRegion);
    setExcludedMenus([]);
    void fetchRecommendation(cleanRegion, [], false);
  }

  function handleQuickRegion(city: string) {
    if (isLoading) return;
    setRegionInput(city);
    setExcludedMenus([]);
    void fetchRecommendation(city, [], false);
  }

  function handleRefreshDifferentMenus() {
    if (isLoading || !recommendation) return;
    const targetRegion = regionInput.trim() || activeRegion || '목포';
    const isSameRegion = targetRegion === activeRegion;
    const nextExclude = isSameRegion ? excludedMenus : [];
    if (!isSameRegion) {
      setExcludedMenus([]);
    }
    void fetchRecommendation(targetRegion, nextExclude, true);
  }

  async function handleDownloadZip() {
    if (isDownloadingZip) return;
    setDownloadError(null);
    setIsDownloadingZip(true);

    try {
      await downloadProjectZip();
    } catch {
      setDownloadError('압축 파일을 만들지 못했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsDownloadingZip(false);
    }
  }

  return (
    <div
      className={`relative min-h-screen transition-colors duration-700 ${theme.pageBg} ${theme.textPrimary}`}
    >
      <WeatherBackdrop condition={weatherKey} />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 sm:px-8">
        <header
          className={`flex items-center justify-between gap-8 border-b py-5 transition-colors duration-700 ${theme.divider}`}
        >
          <a
            href="/"
            className="font-display text-lg font-bold tracking-tight whitespace-nowrap shrink-0 sm:text-xl"
          >
            오늘의 저녁 식탁
          </a>

          <nav className={`hidden items-center gap-6 text-sm md:flex ${theme.textSecondary}`}>
            <a href="#region-search" className="hover:underline whitespace-nowrap shrink-0">
              지역 검색
            </a>
            <a href="#weather-summary" className="hover:underline whitespace-nowrap shrink-0">
              날씨와 계절
            </a>
            <a href="#menu-list" className="hover:underline whitespace-nowrap shrink-0">
              추천 메뉴 5선
            </a>
          </nav>

          <button
            type="button"
            onClick={() => {
              if (!isLoading) {
                const target = regionInput.trim() || '목포';
                setRegionInput(target);
                setExcludedMenus([]);
                void fetchRecommendation(target, [], false);
              }
            }}
            disabled={isLoading}
            className={`min-h-[40px] rounded-lg px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60 ${theme.primaryBtn}`}
          >
            오늘 메뉴 찾기
          </button>
        </header>

        <main className="flex-1 py-8 sm:py-12">
          <section id="region-search" className="mb-10">
            <div className="max-w-2xl">
              <p className={`mb-2 text-xs font-medium ${theme.textMuted}`}>
                실시간 날씨와 계절 기반
              </p>
              <h1 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
                오늘 이 도시의 날씨와 계절로 차리는 다섯 가지 저녁
              </h1>
              <p className={`mt-3 text-sm leading-relaxed sm:text-base ${theme.textSecondary}`}>
                입력한 지역의 오늘 최저 기온과 비·눈 여부, 현재 계절을 확인해 지금 가장 잘 어울리는 저녁 메뉴 5가지를 추천해 드립니다.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`mt-6 rounded-2xl border p-4 transition-colors duration-700 sm:p-5 ${theme.cardSurface} ${theme.cardBorder}`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label htmlFor="region-input" className="sr-only">
                  지역 입력
                </label>
                <div className="relative flex-1">
                  <MapPin
                    className={`pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 ${theme.textMuted}`}
                    aria-hidden="true"
                  />
                  <input
                    id="region-input"
                    type="text"
                    value={regionInput}
                    onChange={(e) => setRegionInput(e.target.value)}
                    placeholder="예: 목포, 서울, 부산, 제주"
                    maxLength={50}
                    disabled={isLoading}
                    className={`h-12 w-full rounded-xl border pr-4 pl-10 text-base outline-none transition-colors ${theme.inputBg} ${theme.inputBorder} ${theme.inputFocus} disabled:opacity-60`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`inline-flex h-12 min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-65 ${theme.primaryBtn}`}
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                  <span>저녁 메뉴 추천받기</span>
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className={`mr-1 text-xs ${theme.textMuted}`}>자주 찾는 지역</span>
                {QUICK_REGIONS.map((city) => {
                  const isActive = regionInput.trim() === city;
                  return (
                    <button
                      key={city}
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleQuickRegion(city)}
                      className={`min-h-[36px] rounded-lg px-3 py-1.5 text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 ${
                        isActive ? theme.quickBtnActive : theme.quickBtn
                      }`}
                    >
                      {city}
                    </button>
                  );
                })}
              </div>
            </form>
          </section>

          {isLoading && (
            <section
              aria-live="polite"
              className={`mb-10 rounded-2xl border px-6 py-12 text-center transition-colors duration-700 ${theme.cardSurface} ${theme.cardBorder}`}
            >
              <div className="mx-auto flex max-w-md flex-col items-center gap-3">
                <Loader2 className={`h-7 w-7 animate-spin ${theme.accentText}`} aria-hidden="true" />
                <p className="font-display text-lg font-semibold">
                  날씨와 계절을 확인하는 중...
                </p>
                <p className={`text-sm ${theme.textMuted}`}>
                  {isRefreshing
                    ? '이전 추천 메뉴를 제외하고 새로운 저녁 메뉴 5가지를 고르고 있습니다.'
                    : `${regionInput.trim() || '목포'}의 오늘 최저 기온과 비·눈 여부를 확인하고 있습니다.`}
                </p>
              </div>
            </section>
          )}

          {!isLoading && errorMessage && (
            <section
              role="alert"
              className={`mb-10 rounded-2xl border p-6 ${theme.cardSurface} ${theme.cardBorder}`}
            >
              <p className="text-sm font-semibold">잠시 후 다시 시도해 주세요</p>
              <p className={`mt-1 text-sm ${theme.textSecondary}`}>{errorMessage}</p>
              <button
                type="button"
                onClick={() =>
                  void fetchRecommendation(regionInput.trim() || '목포', excludedMenus, isRefreshing)
                }
                className={`mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${theme.secondaryBtn}`}
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                <span>다시 시도하기</span>
              </button>
            </section>
          )}

          {!isLoading && !errorMessage && !recommendation && (
            <section
              className={`rounded-2xl border p-6 sm:p-8 ${theme.cardSurface} ${theme.cardBorder}`}
            >
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <p className={`font-mono text-xs tabular-nums ${theme.textMuted}`}>01</p>
                  <h2 className="mt-1.5 font-display text-base font-semibold">실시간 날씨 확인</h2>
                  <p className={`mt-1 text-sm leading-relaxed ${theme.textSecondary}`}>
                    입력한 지역의 좌표를 찾아 오늘 최저 기온과 비·눈 여부를 기준으로 날씨를 확인합니다.
                  </p>
                </div>
                <div>
                  <p className={`font-mono text-xs tabular-nums ${theme.textMuted}`}>02</p>
                  <h2 className="mt-1.5 font-display text-base font-semibold">오늘의 계절 반영</h2>
                  <p className={`mt-1 text-sm leading-relaxed ${theme.textSecondary}`}>
                    오늘 날짜 기준 계절감과 날씨 조건에 가장 어울리는 식사와 조리법을 고릅니다.
                  </p>
                </div>
                <div>
                  <p className={`font-mono text-xs tabular-nums ${theme.textMuted}`}>03</p>
                  <h2 className="mt-1.5 font-display text-base font-semibold">저녁 메뉴 5선</h2>
                  <p className={`mt-1 text-sm leading-relaxed ${theme.textSecondary}`}>
                    날씨·계절 근거가 담긴 5가지 메뉴를 제안하며, 새로고침 시 이전 메뉴는 제외합니다.
                  </p>
                </div>
              </div>
            </section>
          )}

          {!isLoading && recommendation && (
            <div className="space-y-8">
              <section
                id="weather-summary"
                className={`rounded-2xl border p-5 transition-colors duration-700 sm:p-7 ${theme.cardSurface} ${theme.cardBorder}`}
              >
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                  <div className="space-y-2">
                    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs ${theme.textMuted}`}>
                      <span>{recommendation.region}</span>
                      {recommendation.resolvedLocation &&
                        recommendation.resolvedLocation !== recommendation.region && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{recommendation.resolvedLocation}</span>
                          </>
                        )}
                      <span aria-hidden="true">·</span>
                      <span>{recommendation.dateLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{recommendation.season}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <WeatherIcon
                        condition={recommendation.weatherCondition}
                        className={`h-7 w-7 shrink-0 ${theme.accentText}`}
                      />
                      <h2 className="font-display text-xl font-bold sm:text-2xl">
                        {recommendation.weatherConditionLabel}
                        <span className="mx-2 font-mono font-medium tabular-nums">
                          {recommendation.temperature}
                        </span>
                      </h2>
                    </div>

                    <p className={`text-sm leading-relaxed sm:text-base ${theme.textSecondary}`}>
                      {recommendation.weatherSummary}
                    </p>
                  </div>

                  <div className={`shrink-0 space-y-1 text-left sm:text-right text-xs ${theme.textMuted}`}>
                    <p className="font-mono tabular-nums">{recommendation.tempRange}</p>
                    <p className={`text-sm font-medium ${theme.textPrimary}`}>
                      {recommendation.precipitation}
                    </p>
                  </div>
                </div>
              </section>

              <section id="menu-list" aria-label="오늘의 추천 저녁 메뉴 5가지">
                <div className="mb-4 flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-xl font-bold sm:text-2xl">
                    오늘의 추천 저녁 메뉴 5가지
                  </h2>
                  {excludedMenus.length > 5 && (
                    <span className={`text-xs tabular-nums ${theme.textMuted}`}>
                      이전 추천 {excludedMenus.length - 5}개 제외됨
                    </span>
                  )}
                </div>

                <ol className="space-y-3">
                  {recommendation.menus.map((menu, index) => (
                    <li
                      key={`${menu.name}-${index}`}
                      className={`rounded-2xl border p-4 transition-colors duration-700 sm:p-5 ${theme.cardSurface} ${theme.cardBorder}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex shrink-0 items-center gap-3">
                          <span
                            className={`font-mono text-xs font-medium tabular-nums ${theme.textMuted}`}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span
                            className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl sm:h-14 sm:w-14 sm:text-3xl ${
                              theme.isDark ? 'bg-white/[0.08]' : 'bg-black/[0.04]'
                            }`}
                            aria-hidden="true"
                          >
                            {menu.emoji}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                            <h3 className="font-display text-lg font-bold sm:text-xl">
                              {menu.name}
                            </h3>
                            <span className={`text-xs ${theme.accentText}`}>
                              {menu.basisType}
                            </span>
                          </div>
                          <p className={`mt-1.5 text-sm leading-relaxed ${theme.textSecondary}`}>
                            {menu.reason}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleRefreshDifferentMenus}
                    disabled={isLoading}
                    className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60 sm:w-auto ${theme.secondaryBtn}`}
                  >
                    <RefreshCw className="h-4 w-4" aria-hidden="true" />
                    <span>마음에 안 들어요, 새로고침</span>
                  </button>

                  <p className={`text-xs ${theme.textMuted}`}>
                    누르면 지금까지 추천된 메뉴를 빼고 새로운 5가지를 다시 찾아드려요.
                  </p>
                </div>
              </section>
            </div>
          )}
        </main>

        <footer
          className={`border-t py-6 text-xs transition-colors duration-700 ${theme.divider} ${theme.textMuted}`}
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>오늘의 저녁 식탁</span>
              <span aria-hidden="true">·</span>
              <span>실시간 날씨와 계절을 바탕으로 메뉴를 제안합니다</span>
            </div>

            <button
              type="button"
              onClick={() => void handleDownloadZip()}
              disabled={isDownloadingZip}
              className={`inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60 ${theme.secondaryBtn}`}
            >
              {isDownloadingZip ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>
                {isDownloadingZip ? '압축 파일 준비 중...' : 'GitHub용 소스코드 (.zip) 다운로드'}
              </span>
            </button>
          </div>
          {downloadError && (
            <p role="alert" className="mt-2 text-xs font-medium">
              {downloadError}
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}
