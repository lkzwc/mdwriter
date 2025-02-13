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
      if (!text || typeof text !== 'string') return '';
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      return text.replace(linkRegex, '<a href="$2" target="_blank" class="text-blue-600 hover:underline">链接</a>');
    };

    console.log("0000",sortedDailyPlans)

    return (
      <div className="space-y-8">
        {sortedDailyPlans.map(({ date, timeSlots }) => (
          <div key={date} className="space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <h3 className="text-2xl font-bold text-gray-900">{date}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['上午', '下午', '晚上'].map((period, periodIndex) => {
                const periodSlots = timeSlots.filter(slot => 
                  slot.title.toLowerCase().includes(period.toLowerCase())
                );
                
                const getPeriodStyle = (index) => {
                  switch(index) {
                    case 0: // 上午
                      return {
                        header: 'bg-gradient-to-r from-blue-50 to-blue-100',
                        card: 'bg-blue-50/30'
                      };
                    case 1: // 下午
                      return {
                        header: 'bg-gradient-to-r from-amber-50 to-amber-100',
                        card: 'bg-amber-50/30'
                      };
                    case 2: // 晚上
                      return {
                        header: 'bg-gradient-to-r from-purple-50 to-purple-100',
                        card: 'bg-purple-50/30'
                      };
                  }
                };

                const periodStyle = getPeriodStyle(periodIndex);
                
                return (
                  <Card key={period} className={`h-full ${periodStyle.card}`}>
                    <CardHeader className={`${periodStyle.header} px-3 py-1.5`}>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <h4 className="text-xl font-semibold text-gray-900">{period}</h4>
                          【{periodSlots[0]?.title && (
                            <span className="text-sm text-gray-600">
                              {periodSlots[0].title.includes('：') 
                                ? periodSlots[0].title.split('：')[1] 
                                : periodSlots[0].title.split(':')[1]}
                            </span>
                          )}】
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody className="p-3">
                      {periodSlots.length > 0 ? (
                        <div className="space-y-1">
                          {periodSlots.map((slot, slotIndex) => (

                            <div key={slotIndex}>
                              {/* 先显示非任务的普通项目 */}
                              {slot.items && slot.items.map((item, itemIndex) => (
                                <div 
                                  key={itemIndex} 
                                  className="flex items-start mb-1"
                                >
                                  <span className="mr-1.5 mt-0.5">•</span>
                                  <span className="text-sm text-gray-600" dangerouslySetInnerHTML={{
                                    __html: processLinks(typeof item === 'string' ? item : item.content)
                                  }} />
                                </div>
                              ))}
                              
                              {/* 然后显示任务及其子项目 */}
                              {slot.tasks.map((task, taskIndex) => (
                                <div key={taskIndex} className="mb-2">
                                  <div className="mb-1">
                                    {/* 分割标题和描述 */}
                                    {task.title.includes('：') ? (
                                      <>
                                        <span className={`text-sm ${task.isTimePoint ? 'font-semibold' : 'font-bold'} text-gray-900`}>
                                          {task.title.split('：')[0]}：
                                        </span>
                                        <span className="text-sm text-gray-900">
                                          {task.title.split('：')[1]}
                                        </span>
                                      </>
                                    ) : (
                                      <span className={`text-sm ${task.isTimePoint ? 'font-semibold' : 'font-bold'} text-gray-900`}>
                                        {task.title}
                                      </span>
                                    )}
                                  </div>
                                  
                                  {task.items && task.items.map((item, itemIndex) => (
                                    <div 
                                      key={itemIndex} 
                                      className={`flex items-start ${task.isTimePoint ? 'ml-6' : 'ml-4'} mb-1`}
                                    >
                                      <span className="mr-1.5 mt-0.5">•</span>
                                      <span className="text-sm text-gray-600" dangerouslySetInnerHTML={{
                                        __html: processLinks(typeof item === 'string' ? item : item.content)
                                      }} />
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
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
