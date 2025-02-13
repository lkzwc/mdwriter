'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Card, CardHeader, CardBody } from '@heroui/react';
import ReactMarkdown from 'react-markdown';
import { parseMarkdownToObject, getDailyPlans, getSummaryPlan, getBasicInfo, parseDateString, parseDailyPlanContent } from '../../utils/studyPlanParser';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function StudyPlanDisplay() {
  const [remainingTime, setRemainingTime] = useState(null);
  const [markdown, setMarkdown] = useState('');
  const [selectedTab, setSelectedTab] = useState('daily');
  
  useEffect(() => {
    // 从文件加载Markdown内容
    fetch('/docs/陕西事业单位D类备考计划.md')
      .then(res => res.text())
      .then(text => setMarkdown(text))
      .catch(err => console.error('Error loading markdown:', err));
  }, []);

  const basicInfo = getBasicInfo(markdown);
  const dailyPlans = getDailyPlans(markdown);
  const summaryPlan = getSummaryPlan(markdown);
  
  // 从基本信息中提取考试时间
  const examDate = Object.values(basicInfo)[0]?.split('\n')
    .find(line => line.includes('考试时间：'))
    ?.split('考试时间：')[1]
    ?.trim();

  // 计算倒计时
  useEffect(() => {
    const calculateRemainingTime = () => {
      if (!examDate) return null;
      
      const examDateObj = new Date(examDate.replace(/年|月|日/g, match => {
        switch (match) {
          case '年': return '/';
          case '月': return '/';
          case '日': return '';
        }
      }));
      
      const now = new Date();
      const diff = examDateObj - now;
      
      if (diff <= 0) return null;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return { days, hours, minutes, seconds };
    };

    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000); // 每秒更新一次

    setRemainingTime(calculateRemainingTime());
    return () => clearInterval(timer);
  }, [examDate]);

  const renderCountdown = () => {
    if (!remainingTime) return null;

    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl shadow-lg mb-6">
        <div className="text-2xl font-semibold text-default-600 mb-2">距离考试还剩</div>
        <div className="flex items-baseline gap-4">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold text-primary">{remainingTime.days}</div>
            <div className="text-sm text-default-500 mt-1">天</div>
          </div>
          <div className="text-4xl font-bold text-default-400">:</div>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold text-primary">{remainingTime.hours}</div>
            <div className="text-sm text-default-500 mt-1">时</div>
          </div>
          <div className="text-4xl font-bold text-default-400">:</div>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold text-primary">{remainingTime.minutes}</div>
            <div className="text-sm text-default-500 mt-1">分</div>
          </div>
          <div className="text-4xl font-bold text-default-400">:</div>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold text-primary">{remainingTime.seconds}</div>
            <div className="text-sm text-default-500 mt-1">秒</div>
          </div>
        </div>
        <div className="text-sm text-default-500 mt-4">加油！时间就是金钱，抓紧每一分每一秒！</div>
      </div>
    );
  };

  const renderDailyPlan = () => {
    const today = new Date();
    const todayStr = `${today.getMonth() + 1}月${today.getDate()}日`;
    const todayPlan = Object.entries(dailyPlans)
      .find(([key]) => key.includes(todayStr));

    return (
      <Card>
        <CardHeader>
          <h3 className="text-xl font-bold">今日学习计划</h3>
        </CardHeader>
        <CardBody>
          {todayPlan ? (
            <div className="prose max-w-none">
              <ReactMarkdown>{todayPlan[1]}</ReactMarkdown>
            </div>
          ) : (
            <div className="text-gray-600 text-center py-8">今日暂无学习计划</div>
          )}
        </CardBody>
      </Card>
    );
  };

  const renderSummaryPlan = () => {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-xl font-bold">概要计划</h3>
        </CardHeader>
        <CardBody>
          <div className="prose max-w-none">
            {Object.entries(summaryPlan).map(([title, content]) => (
              <div key={title} className="mb-6">
                <h4 className="text-lg font-semibold mb-2">{title}</h4>
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  };

  const renderFullPlan = () => {
    const sortedDailyPlans = Object.entries(dailyPlans)
      .map(([date, content]) => {
        const timeSlots = parseDailyPlanContent(content);
        return {
          date,
          timeSlots,
        };
      })
      .sort((a, b) => {
        const dateA = parseDateString(a.date);
        const dateB = parseDateString(b.date);
        return dateA - dateB;
      });

    // 处理链接的辅助函数
    const processLinks = (text) => {
      if (!text) return text;
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      return text.replace(linkRegex, '<a href="$2" target="_blank" class="text-blue-600 hover:underline">链接</a>');
    };

    return (
      <div className="space-y-8">
        {sortedDailyPlans.map(({ date, timeSlots }) => (
          <div key={date} className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h3 className="text-2xl font-bold text-gray-900">{date}</h3>
              {remainingTime && (
                <div className="text-right">
                  <div className="text-sm text-gray-500">距离考试还有</div>
                  <div className="text-lg font-semibold text-blue-600">
                    {remainingTime.days}天 {remainingTime.hours}时 {remainingTime.minutes}分 {remainingTime.seconds}秒
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['上午', '下午', '晚上'].map(period => {
                const periodSlots = timeSlots.filter(slot => 
                  slot.title.toLowerCase().includes(period.toLowerCase())
                );
                
                return (
                  <Card key={period} className="h-full">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2">
                      <h4 className="text-lg font-semibold text-blue-900">{period}</h4>
                    </CardHeader>
                    <CardBody className="p-4">
                      {periodSlots.length > 0 ? (
                        periodSlots.map((slot, slotIndex) => (
                          <div key={slotIndex} className="mb-4 last:mb-0">
                            <div className="text-sm text-gray-600 mb-2">
                              {slot.title}
                              {slot.description && (
                                <span className="ml-2" dangerouslySetInnerHTML={{
                                  __html: processLinks(slot.description)
                                }} />
                              )}
                            </div>
                            
                            {slot.items && (
                              <div className="space-y-2 mb-3">
                                {slot.items.map((item, itemIndex) => (
                                  <div 
                                    key={itemIndex} 
                                    className="text-sm text-gray-600 ml-4"
                                    dangerouslySetInnerHTML={{
                                      __html: `• ${processLinks(item)}`
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                            
                            {slot.tasks.map((task, taskIndex) => {
                              const isFirstHour = task.title.includes('第1个小时');
                              const isTask = task.title.includes('任务');
                              
                              return (
                                <div
                                  key={taskIndex}
                                  className={classNames(
                                    'ml-4 mb-3 p-3 rounded-lg',
                                    isFirstHour ? 'bg-green-50' : '',
                                    isTask ? 'bg-yellow-50' : ''
                                  )}
                                >
                                  <div className={classNames(
                                    'text-sm font-medium mb-2',
                                    isFirstHour ? 'text-green-800' : '',
                                    isTask ? 'text-yellow-800' : 'text-gray-900'
                                  )}>
                                    {task.title}
                                    {task.description && (
                                      <span 
                                        className="text-gray-600 ml-2"
                                        dangerouslySetInnerHTML={{
                                          __html: processLinks(task.description)
                                        }}
                                      />
                                    )}
                                  </div>
                                  
                                  {task.items && (
                                    <div className="space-y-1">
                                      {task.items.map((item, itemIndex) => (
                                        <div 
                                          key={itemIndex} 
                                          className="text-sm text-gray-600"
                                          dangerouslySetInnerHTML={{
                                            __html: `• ${processLinks(item)}`
                                          }}
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500 italic">无安排</div>
                      )}
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderCountdown()}
        
        <Tabs 
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab}
          color="primary"
          variant="underlined"
          size="lg"
          className="mb-8"
        >
          <Tab key="daily" title="当日计划">
            {renderDailyPlan()}
          </Tab>
          <Tab key="summary" title="概要计划">
            {renderSummaryPlan()}
          </Tab>
          <Tab key="full" title="全部计划">
            {renderFullPlan()}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
