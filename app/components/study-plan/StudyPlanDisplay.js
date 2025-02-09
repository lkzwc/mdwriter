"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import studyPlanData from "./studyPlanData";
import { Card, CardBody, Tab, Tabs } from "@heroui/react";

const overviewMarkdown = `# 陕西事业单位D类考试 42天备考计划

## 考试基本信息

- 考试时间：2025年3月29日
- 剩余天数：42天（2月15日-3月28日）
- 考试类型：D类（综合管理类）
- 考试科目：
  1. 《职业能力倾向测验》（90分钟，100分）
  2. 《综合应用能力》（120分钟，150分）

## 学习资源整理

### 在线视频资源
1. 职业能力倾向测验
   - [2025事业单位D类职测系统班](https://www.bilibili.com/video/BV11MwgeNERp/)
   - [言语理解与表达专题课](https://www.bilibili.com/video/BV1Kw411x7GL/)
   - [数量关系解题技巧](https://www.bilibili.com/video/BV1vN4y1R7ZE/)
   - [判断推理专项训练](https://www.bilibili.com/video/BV1Cm4y1E7Nq/)

2. 综合应用能力
   - [综合应用能力系统精讲](https://www.bilibili.com/video/BV12grUYREaL/)
   - [公文写作专项训练](https://www.bilibili.com/video/BV1Bw411Y7dq/)
   - [材料分析题型精讲](https://www.bilibili.com/video/BV1994y1o7Lu/)

### 每日学习建议
1. 学习时间分配
   - 上午：重点进行新知识学习和理解
   - 下午：专项练习和真题训练
   - 晚上：复习总结和错题分析

2. 学习方法建议
   - 使用番茄工作法：25分钟专注学习，5分钟短暂休息
   - 每个知识点学习后立即进行练习
   - 建立错题本，定期复习
   - 每周进行一次模拟考试

3. 复习要点
   - 每天记录学习重点和难点
   - 周末进行知识点整理和回顾
   - 建立知识体系思维导图
   - 根据练习情况调整学习计划

## 每日学习计划（2小时为单位）

### 第一周（2月15日-2月21日）：基础夯实周

#### 2月15日（周五）
- 上午时段（2小时）：考试大纲解析与复习规划
  - 任务1：熟悉考试大纲（40分钟）
    - 观看视频：[2025事业单位联考D类课程考情分析](https://www.bilibili.com/video/BV11MwgeNERp/)
    - 记录重点内容：考试类型、分值分布、时间分配
  - 任务2：制定详细复习计划（40分钟）
    - 根据考试大纲分配学习时间
    - 建立每日学习清单
    - 下载并安装番茄钟计时器APP
    - 准备错题笔记本和知识点整理本
  - 任务3：收集必要复习资料（40分钟）
    - 下载历年真题
    - 整理教材资料
    - 收藏重要视频课程
    - 准备必要的文具和学习用品
    
- 下午时段（2小时）：言语理解专项训练
  - 任务1：言语理解基础知识（40分钟）
    - 观看视频：[言语理解片段阅读与主旨理解](https://www.bilibili.com/video/BV1Kw411x7GL/)
    - 做笔记：主旨概括方法、关键词提取技巧
  - 任务2：词语填空专项练习（40分钟）
    - 完成30道词语填空题
    - 总结错题，建立词语辨析笔记
  - 任务3：实战演练（40分钟）
    - 完成一套言语理解真题
    - 总结解题技巧和注意事项

- 晚上时段（2小时）：综合应用能力入门
  - 任务1：材料分析题型讲解（40分钟）
    - 观看视频：[综合应用能力D类精讲](https://www.bilibili.com/video/BV12grUYREaL/)
    - 记录答题框架和技巧
  - 任务2：教育观点分析练习（40分钟）
    - 学习素质教育相关理论
    - 练习教育观点分析题
  - 任务3：答题规范训练（40分钟）
    - 熟悉答题格式要求
    - 练习规范答题

#### 2月16日（周六）
- 上午时段（2小时）：数量关系专项训练
  - 任务1：数量关系基础知识（40分钟）
    - 观看视频：[数量关系解题技巧](https://www.bilibili.com/video/BV1vN4y1R7ZE/)
    - 掌握基本解题方法
  - 任务2：数字推理练习（40分钟）
    - 练习数列找规律
    - 总结常见数列规律
  - 任务3：数学运算练习（40分钟）
    - 练习速算技巧
    - 完成真题练习

- 下午时段（2小时）：公文写作基础
  - 任务1：公文格式学习（40分钟）
    - 观看视频：[公文写作基础知识](https://www.bilibili.com/video/BV1Bw411Y7dq/)
    - 记录各类公文格式要求
  - 任务2：常用公文写作练习（40分钟）
    - 练习通知、请示的写作
    - 掌握关键词运用
  - 任务3：实战演练（40分钟）
    - 完成一篇完整公文写作
    - 对照范文进行修改

- 晚上时段（2小时）：言语理解真题练习
  - 任务1：真题解析（40分钟）
    - 完成2024年真题
    - 总结解题思路
  - 任务2：重点题型练习（40分钟）
    - 针对性练习难点题型
    - 建立解题模板
  - 任务3：错题订正（40分钟）
    - 分析错误原因
    - 建立个人题库

#### 2月17日（周日）
- 上午时段（2小时）：判断推理专项
  - 任务1：判断推理基础知识（40分钟）
    - 观看视频：[判断推理专项训练](https://www.bilibili.com/video/BV1Cm4y1E7Nq/)
    - 掌握基本解题方法
  - 任务2：图形推理练习（40分钟）
    - 练习图形推理题型
    - 总结常见图形规律
  - 任务3：逻辑判断练习（40分钟）
    - 练习逻辑判断题型
    - 总结常见逻辑规律

- 下午时段（2小时）：材料分析专题
  - 任务1：材料分析基础知识（40分钟）
    - 观看视频：[材料分析题型精讲](https://www.bilibili.com/video/BV1994y1o7Lu/)
    - 掌握基本分析方法
  - 任务2：数据分析练习（40分钟）
    - 练习数据解读技巧
    - 总结常见数据类型
  - 任务3：综合分析练习（40分钟）
    - 练习综合分析题型
    - 总结答题框架

- 晚上时段（2小时）：第一周总结与规划
  - 任务1：总结本周学习内容（40分钟）
    - 整理知识点笔记
    - 复习重点难点
  - 任务2：完善下周学习计划（40分钟）
    - 根据本周学习情况调整计划
    - 准备下周学习材料
  - 任务3：模拟考试（40分钟）
    - 完成一套综合模拟题
    - 总结答题技巧

### 第二周（2月22日-2月28日）：强化训练周

#### 2月22日（周五）
- 上午时段（2小时）：言语理解强化训练
  - 任务1：语句表达与语言运用（40分钟）
    - 观看视频：[语句表达技巧精讲](https://www.bilibili.com/video/BV1Kw411x7GL/)
    - 记录重点解题方法
  - 任务2：病句辨析练习（40分钟）
    - 完成病句辨析专项练习
    - 总结常见病句类型
  - 任务3：实战演练（40分钟）
    - 完成一套言语理解真题
    - 分析错误原因并总结

- 下午时段（2小时）：数量关系强化
  - 任务1：数学运算技巧（40分钟）
    - 观看视频：[数学运算高频考点](https://www.bilibili.com/video/BV1vN4y1R7ZE/)
    - 整理解题公式
  - 任务2：行程问题专练（40分钟）
    - 练习行程问题题型
    - 总结解题思路
  - 任务3：工程问题练习（40分钟）
    - 练习工程问题题型
    - 建立解题模板

- 晚上时段（2小时）：综合应用能力练习
  - 任务1：公文写作练习（40分钟）
    - 练习通知、报告写作
    - 对照范文修改
  - 任务2：案例分析（40分钟）
    - 分析典型案例
    - 练习观点论证
  - 任务3：实战演练（40分钟）
    - 完成一套综合应用真题
    - 总结答题技巧

#### 2月23日（周六）
- 上午时段（2小时）：判断推理强化
  - 任务1：图形推理专题（40分钟）
    - 观看视频：[图形推理高频考点](https://www.bilibili.com/video/BV1Cm4y1E7Nq/)
    - 总结图形变化规律
  - 任务2：定义判断练习（40分钟）
    - 练习定义判断题型
    - 总结解题技巧
  - 任务3：类比推理练习（40分钟）
    - 练习类比推理题型
    - 建立知识框架

- 下午时段（2小时）：材料分析强化
  - 任务1：数据分析专题（40分钟）
    - 观看视频：[数据分析方法精讲](https://www.bilibili.com/video/BV1994y1o7Lu/)
    - 总结数据分析方法
  - 任务2：文字材料分析（40分钟）
    - 练习文字材料分析
    - 总结分析框架
  - 任务3：综合材料分析（40分钟）
    - 练习综合性材料
    - 总结答题技巧

- 晚上时段（2小时）：模拟练习
  - 任务1：职测模拟（60分钟）
    - 完成一套职测真题
    - 严格计时
  - 任务2：答案讲解（30分钟）
    - 详细分析错题
    - 总结解题方法
  - 任务3：重点复习（30分钟）
    - 整理本周重点
    - 查漏补缺

#### 2月24日（周日）
- 上午时段（2小时）：常识判断专练
  - 任务1：时政热点（40分钟）
    - 整理近期时政要点
    - 记录重要政策方针
  - 任务2：科技与文化（40分钟）
    - 学习科技发展动态
    - 复习文化常识
  - 任务3：实战演练（40分钟）
    - 完成常识判断真题
    - 总结解题技巧

- 下午时段（2小时）：综合应用能力
  - 任务1：公文写作（40分钟）
    - 练习决定、通知写作
    - 对照范文修改
  - 任务2：社会热点分析（40分钟）
    - 分析社会热点问题
    - 练习观点论证
  - 任务3：方案设计（40分钟）
    - 练习方案设计题
    - 总结框架模板

- 晚上时段（2小时）：第二周总结
  - 任务1：整理笔记（40分钟）
    - 整理本周重点
    - 完善知识体系
  - 任务2：查漏补缺（40分钟）
    - 分析薄弱环节
    - 制定强化计划
  - 任务3：规划下周（40分钟）
    - 调整学习计划
    - 准备学习资料

### 第三周（2月29日-3月6日）：查漏补缺周

#### 2月29日（周五）
- 上午时段（2小时）：言语理解查漏
  - 任务1：重点题型复习（40分钟）
    - 观看视频：[言语理解难点突破](https://www.bilibili.com/video/BV1Kw411x7GL/)
    - 整理解题思路
  - 任务2：难点突破（40分钟）
    - 练习难度题目
    - 总结解题方法
  - 任务3：模拟练习（40分钟）
    - 完成模拟试题
    - 总结解题技巧

- 下午时段（2小时）：数量关系查漏
  - 任务1：重点公式复习（40分钟）
    - 整理常用公式
    - 练习速算技巧
  - 任务2：难点题型（40分钟）
    - 练习高难度题目
    - 总结解题思路
  - 任务3：模拟练习（40分钟）
    - 完成模拟试题
    - 总结时间分配

- 晚上时段（2小时）：综合应用能力
  - 任务1：公文写作练习（40分钟）
    - 练习综合性公文
    - 提升写作水平
  - 任务2：材料分析（40分钟）
    - 练习综合材料
    - 强化分析能力
  - 任务3：答题规范（40分钟）
    - 规范答题格式
    - 提高答题质量

#### 3月1日（周六）
- 上午时段（2小时）：判断推理查漏
  - 任务1：图形推理专练（40分钟）
    - 练习高难度图形
    - 总结变化规律
  - 任务2：逻辑判断（40分钟）
    - 练习逻辑推理
    - 强化解题思路
  - 任务3：模拟练习（40分钟）
    - 完成模拟试题
    - 总结解题方法

- 下午时段（2小时）：资料分析查漏
  - 任务1：数据分析（40分钟）
    - 练习快速计算
    - 提高准确率
  - 任务2：材料分析（40分钟）
    - 练习综合材料
    - 强化理解能力
  - 任务3：综合练习（40分钟）
    - 完成综合试题
    - 总结解题方法

- 晚上时段（2小时）：模拟考试
  - 任务1：职测模拟（90分钟）
    - 完整模拟试卷
    - 严格控制时间
  - 任务2：试卷分析（30分钟）
    - 详细分析错题
    - 总结解题技巧

### 第四周（3月7日-3月13日）：强化冲刺周

#### 3月7日（周五）
- 上午时段（2小时）：言语理解冲刺
  - 任务1：高难度阅读理解（40分钟）
    - 练习长难句分析
    - 提升理解速度
  - 任务2：逻辑填空（40分钟）
    - 练习词语辨析
    - 提高准确率
  - 任务3：模拟练习（40分钟）
    - 完成模拟试题
    - 总结解题技巧

- 下午时段（2小时）：数量关系冲刺
  - 任务1：高频题型（40分钟）
    - 练习常考题型
    - 提升解题速度
  - 任务2：难点突破（40分钟）
    - 练习难度题目
    - 巩固解题方法
  - 任务3：模拟练习（40分钟）
    - 完成模拟试题
    - 总结时间分配

- 晚上时段（2小时）：综合应用能力
  - 任务1：公文写作（40分钟）
    - 练习综合性公文
    - 提升写作水平
  - 任务2：材料分析（40分钟）
    - 练习综合材料
    - 强化分析能力
  - 任务3：实战演练（40分钟）
    - 完成真题练习
    - 总结答题技巧

#### 3月8日（周六）
- 上午时段（2小时）：判断推理冲刺
  - 任务1：图形推理（40分钟）
    - 练习高难度图形
    - 提升解题速度
  - 任务2：逻辑判断（40分钟）
    - 练习逻辑推理
    - 强化思维能力
  - 任务3：模拟练习（40分钟）
    - 完成模拟试题
    - 总结解题方法

- 下午时段（2小时）：资料分析冲刺
  - 任务1：数据分析（40分钟）
    - 练习快速计算
    - 提高准确率
  - 任务2：材料分析（40分钟）
    - 练习综合材料
    - 强化理解能力
  - 任务3：实战演练（40分钟）
    - 完成真题练习
    - 总结答题技巧

- 晚上时段（2小时）：模拟考试
  - 任务1：全真模拟（90分钟）
    - 完成整套试题
    - 严格控制时间
  - 任务2：详细讲解（30分钟）
    - 分析错误原因
    - 总结解题技巧

### 第五周（3月14日-3月20日）：模拟训练周

#### 3月14日（周五）
- 上午时段（2小时）：职测模拟（一）
  - 任务1：完成模拟试卷（90分钟）
  - 任务2：详细讲解（30分钟）

- 下午时段（2小时）：综合应用模拟（一）
  - 任务1：完成模拟试卷（120分钟）

- 晚上时段（2小时）：试卷分析
  - 任务1：职测试卷分析（60分钟）
  - 任务2：综合应用试卷分析（60分钟）

#### 3月15日（周六）
- 上午时段（2小时）：职测模拟（二）
  - 任务1：完成模拟试卷（90分钟）
  - 任务2：详细讲解（30分钟）

- 下午时段（2小时）：综合应用模拟（二）
  - 任务1：完成模拟试卷（120分钟）

- 晚上时段（2小时）：试卷分析
  - 任务1：错题分析（60分钟）
  - 任务2：答题技巧总结（60分钟）

### 第六周（3月21日-3月28日）：最后冲刺周

#### 3月21日（周五）
- 上午时段（2小时）：要点复习
  - 任务1：职测要点梳理（60分钟）
  - 任务2：综合应用要点梳理（60分钟）

- 下午时段（2小时）：模拟练习
  - 任务1：职测模拟（90分钟）
  - 任务2：试卷分析（30分钟）

- 晚上时段（2小时）：查漏补缺
  - 任务1：重点题型复习（60分钟）
  - 任务2：答题技巧总结（60分钟）

#### 3月22日（周六）
- 上午时段（2小时）：最后模拟
  - 任务1：职测全真模拟（90分钟）
  - 任务2：试卷讲解（30分钟）

- 下午时段（2小时）：综合应用
  - 任务1：综合应用模拟（120分钟）

- 晚上时段（2小时）：总结
  - 任务1：考前要点整理（60分钟）
  - 任务2：考试策略制定（60分钟）

#### 3月23日-3月28日：考前调整期
- 合理安排作息时间
- 适度复习，保持状态
- 调整心态，保持良好精神状态
- 准备考试用品
- 熟悉考场地址和交通路线

## 考试日特别提醒（3月29日）

### 考前准备
1. 考试用品准备
   - 准考证
   - 身份证
   - 黑色签字笔多支
   - 2B铅笔
   - 橡皮
   - 手表（无声）

2. 时间安排
   - 提前一天查看考场
   - 提前2小时到达考场
   - 注意休息，保持良好状态

### 考试时间安排
1. 《职业能力倾向测验》
   - 时间：90分钟
   - 建议时间分配：
     - 言语理解：25分钟
     - 数量关系：25分钟
     - 判断推理：25分钟
     - 资料分析：15分钟

2. 《综合应用能力》
   - 时间：120分钟
   - 建议时间分配：
     - 阅读材料：20分钟
     - 草拟提纲：20分钟
     - 作答：70分钟
     - 检查：10分钟

### 注意事项
1. 考试前一周保持规律作息
2. 考前不要过度复习
3. 临考前保持良好心态
4. 注意考场纪律和要求
5. 合理分配答题时间
6. 认真审题，规范答题
`;

export default function StudyPlanDisplay() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [todayPlan, setTodayPlan] = useState(null);

  // 计算倒计时
  useEffect(() => {
    const examDate = new Date("2025-03-29T09:00:00+08:00");

    const updateCountdown = () => {
      const now = new Date();
      const diff = examDate - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  // 获取当天的学习计划
  useEffect(() => {
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0];
    const plan = studyPlanData[dateStr];
    setTodayPlan(plan);
  }, []);

  return (
    <div className="space-y-8">
      {/* 倒计时显示 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          距离2025陕西事业单位D类考试还有
        </h2>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {countdown.days}
            </div>
            <div className="text-gray-600">天</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {countdown.hours}
            </div>
            <div className="text-gray-600">小时</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {countdown.minutes}
            </div>
            <div className="text-gray-600">分钟</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {countdown.seconds}
            </div>
            <div className="text-gray-600">秒</div>
          </div>
        </div>
      </div>

      <Tabs aria-label="Options" className="text-center" size="lg"> 
        <Tab key="now" title="当天计划">
          <Card>
            <CardBody>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  今日学习计划
                </h2>
                {todayPlan ? (
                  <div className="space-y-6">
                    {["上午", "下午", "晚上"].map((timeSlot) => (
                      <div
                        key={timeSlot}
                        className="border-l-4 border-blue-500 pl-4"
                      >
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                          {timeSlot}时段（2小时）：{todayPlan[timeSlot]?.title}
                        </h3>
                        <div className="space-y-4">
                          {todayPlan[timeSlot]?.tasks.map((task, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 p-4 rounded-lg"
                            >
                              <div className="font-medium text-gray-800 mb-2">
                                任务{index + 1}：{task.name}（{task.duration}）
                              </div>
                              <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {task.details.map((detail, i) => (
                                  <li key={i}>{detail}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-600">
                    今日暂无学习计划
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="all" title="全部计划">
          <Card className="p-4"> 
            <CardBody>
              <ReactMarkdown
                className="prose prose-blue max-w-none"
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      className="text-blue-600 hover:text-blue-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      {...props}
                      className="text-2xl font-bold text-gray-800 mb-4"
                    />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4
                      {...props}
                      className="text-xl font-semibold text-gray-700 mb-3"
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      {...props}
                      className="list-disc list-inside space-y-2 text-gray-600"
                    />
                  ),
                }}
              >
                {overviewMarkdown}
              </ReactMarkdown>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
