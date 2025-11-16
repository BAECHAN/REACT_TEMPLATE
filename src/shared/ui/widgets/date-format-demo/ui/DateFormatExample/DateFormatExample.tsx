import { useEffect, useState } from 'react';
import { DateUtil } from '@/shared/utils/date.util';
import {
  StyledExampleContainer,
  StyledExampleItem,
  StyledExampleLabel,
  StyledExampleValue,
} from './DateFormatExample.styles';

export function DateFormatExample() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const examples = [
    { label: '기본 포맷', value: DateUtil.formatDefault(now), description: 'YYYY-MM-DD' },
    { label: '한국어 날짜', value: DateUtil.formatKorean(now), description: 'YYYY년 M월 D일' },
    {
      label: '한국어 날짜 + 요일',
      value: DateUtil.formatKoreanWithDay(now),
      description: 'YYYY년 M월 D일 dddd',
    },
    {
      label: '오전/오후 시간',
      value: DateUtil.formatKoreanTime(now),
      description: '오전/오후 H시 mm분',
    },
    {
      label: '날짜 + 오전/오후 시간',
      value: DateUtil.formatKoreanDateTime(now),
      description: 'YYYY년 M월 D일 오전/오후 H시 mm분',
    },
    {
      label: '날짜 + 요일 + 시간',
      value: DateUtil.formatKoreanDateTimeWithDay(now),
      description: 'YYYY년 M월 D일 dddd 오전/오후 H시 mm분',
    },
    { label: '시간 (HH:mm)', value: DateUtil.formatTime(now), description: 'HH:mm' },
    {
      label: '오전/오후 시간 (간단)',
      value: DateUtil.formatTimeWithPeriod(now),
      description: '오전/오후 h:mm',
    },
    { label: '월일만', value: DateUtil.formatMonthDay(now), description: 'M월 D일' },
    { label: '년월만', value: DateUtil.formatYearMonth(now), description: 'YYYY년 M월' },
  ];

  const relativeExamples = [
    { date: new Date(now.getTime() - 30 * 1000), label: '30초 전' },
    { date: new Date(now.getTime() - 5 * 60 * 1000), label: '5분 전' },
    { date: new Date(now.getTime() - 3 * 60 * 60 * 1000), label: '3시간 전' },
    { date: new Date(now.getTime() - 24 * 60 * 60 * 1000), label: '어제' },
    { date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), label: '3일 전' },
    { date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), label: '10일 전' },
  ];

  const boardExamples = [
    { date: now, label: '오늘' },
    { date: new Date(now.getTime() - 24 * 60 * 60 * 1000), label: '어제' },
    { date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), label: '3일 전 (요일)' },
    { date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), label: '10일 전 (월일)' },
  ];

  return (
    <StyledExampleContainer data-fsd-path="shared/ui/widgets/date-format-demo/DateFormatExample">
      <StyledExampleItem>
        <StyledExampleLabel>기본 포맷 예제</StyledExampleLabel>
        {examples.map((example) => (
          <div key={example.label} style={{ marginBottom: '0.75rem' }}>
            <StyledExampleValue>{example.value}</StyledExampleValue>
            <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>
              {example.label} ({example.description})
            </div>
          </div>
        ))}
      </StyledExampleItem>

      <StyledExampleItem>
        <StyledExampleLabel>상대 시간 예제</StyledExampleLabel>
        {relativeExamples.map((example) => (
          <div key={example.label} style={{ marginBottom: '0.75rem' }}>
            <StyledExampleValue>{DateUtil.formatRelative(example.date)}</StyledExampleValue>
            <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>
              {example.label}
            </div>
          </div>
        ))}
      </StyledExampleItem>

      <StyledExampleItem>
        <StyledExampleLabel>게시판 스타일 예제</StyledExampleLabel>
        {boardExamples.map((example) => (
          <div key={example.label} style={{ marginBottom: '0.75rem' }}>
            <StyledExampleValue>{DateUtil.formatBoard(example.date)}</StyledExampleValue>
            <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>
              {example.label}
            </div>
          </div>
        ))}
      </StyledExampleItem>

      <StyledExampleItem>
        <StyledExampleLabel>날짜 범위 예제</StyledExampleLabel>
        <div style={{ marginBottom: '0.75rem' }}>
          <StyledExampleValue>
            {DateUtil.formatDateRange(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), now)}
          </StyledExampleValue>
          <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>
            시작일 ~ 종료일
          </div>
        </div>
      </StyledExampleItem>
    </StyledExampleContainer>
  );
}
