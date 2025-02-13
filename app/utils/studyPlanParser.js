// 解析 Markdown 为结构化对象
export function parseMarkdownToObject(markdown) {
  if (!markdown || typeof markdown !== 'string') return {};

  const lines = markdown.split('\n');
  const result = {
    basicInfo: {},
    dailyPlans: {},
    summaryPlan: {},
    fullPlan: {}
  };
  
  let currentSection = null;
  let currentTitle = null;
  let currentContent = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // 检查日期标题 (####)
    const dateMatch = line.match(/^####\s+(\d+月\d+日)（(.+?)）$/);
    if (dateMatch) {
      if (currentTitle && currentContent.length > 0) {
        if (currentSection === 'dailyPlans') {
          result.dailyPlans[currentTitle] = currentContent.join('\n');
        }
      }
      currentTitle = `${dateMatch[1]}（${dateMatch[2]}）`;
      currentSection = 'dailyPlans';
      currentContent = [];
      continue;
    }

    // 检查主要标题 (##)
    const mainTitleMatch = line.match(/^##\s+(.+)$/);
    if (mainTitleMatch) {
      if (currentTitle && currentContent.length > 0) {
        if (currentSection === 'dailyPlans') {
          result.dailyPlans[currentTitle] = currentContent.join('\n');
        } else if (currentSection === 'summaryPlan') {
          result.summaryPlan[currentTitle] = currentContent.join('\n');
        } else if (currentSection === 'basicInfo') {
          result.basicInfo[currentTitle] = currentContent.join('\n');
        }
      }
      currentTitle = mainTitleMatch[1];
      currentContent = [];
      
      // 根据标题内容确定当前部分
      if (currentTitle === '考试基本信息') {
        currentSection = 'basicInfo';
      } else {
        currentSection = 'summaryPlan';
      }
      continue;
    }

    // 收集当前标题下的内容
    if (currentTitle) {
      currentContent.push(line);
    }
  }

  // 处理最后一个部分
  if (currentTitle && currentContent.length > 0) {
    if (currentSection === 'dailyPlans') {
      result.dailyPlans[currentTitle] = currentContent.join('\n');
    } else if (currentSection === 'summaryPlan') {
      result.summaryPlan[currentTitle] = currentContent.join('\n');
    } else if (currentSection === 'basicInfo') {
      result.basicInfo[currentTitle] = currentContent.join('\n');
    }
  }

  return result;
}

// 获取指定标题下的内容
export function getSectionContent(markdown, sectionTitle) {
  if (!markdown || !sectionTitle) return '';
  const data = parseMarkdownToObject(markdown);
  
  // 在各个部分中查找内容
  for (const section of ['basicInfo', 'dailyPlans', 'summaryPlan', 'fullPlan']) {
    if (data[section] && data[section][sectionTitle]) {
      return data[section][sectionTitle];
    }
  }
  return '';
}

// 获取所有每日计划
export function getDailyPlans(markdown) {
  if (!markdown) return {};

  const lines = markdown.split('\n');
  const dailyPlans = {};
  let currentDate = null;
  let currentContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // 匹配日期标题（#### 2月15日（周四））
    const dateMatch = line.match(/^####\s+(\d+月\d+日（[^)]+）)$/);
    if (dateMatch) {
      // 如果已经有之前的日期内容，保存它
      if (currentDate && currentContent.length > 0) {
        dailyPlans[currentDate] = currentContent.join('\n');
      }
      currentDate = dateMatch[1];
      currentContent = [];
      continue;
    }

    // 如果我们在一个日期块内，收集内容
    if (currentDate) {
      // 如果遇到下一个四级标题，说明当前日期块结束
      if (line.startsWith('####')) {
        dailyPlans[currentDate] = currentContent.join('\n');
        currentDate = null;
        currentContent = [];
      } else {
        currentContent.push(line);
      }
    }
  }

  // 保存最后一个日期的内容
  if (currentDate && currentContent.length > 0) {
    dailyPlans[currentDate] = currentContent.join('\n');
  }

  console.log('Parsed daily plans:', dailyPlans); 
  return dailyPlans;
}

// 解析概要计划内容
export function parseSummaryContent(content) {
  if (!content) return [];

  const lines = content.split('\n');
  const slots = [];
  let currentSlot = null;
  let currentTask = null;

  lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    // 匹配标题（数字+点开头）
    const titleMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (titleMatch) {
      if (currentSlot) {
        slots.push(currentSlot);
      }
      currentSlot = {
        title: line,
        tasks: []
      };
      currentTask = null;
      return;
    }

    // 匹配子标题（字母+点开头）
    const subTitleMatch = line.match(/^[a-zA-Z]\.\s+(.+)$/);
    if (subTitleMatch && currentSlot) {
      currentTask = {
        title: line,
        items: [],
        isTimePoint: false
      };
      currentSlot.tasks.push(currentTask);
      return;
    }

    // 处理列表项（以 - 或 * 开头的行）
    const listItemMatch = line.match(/^[-*]\s+(.+)$/);
    if (listItemMatch) {
      const content = listItemMatch[1];
      if (currentTask) {
        currentTask.items.push({
          content,
          isSubTask: true
        });
      } else if (currentSlot) {
        if (!currentSlot.items) {
          currentSlot.items = [];
        }
        currentSlot.items.push({
          content,
          isSubTask: false
        });
      }
      return;
    }

    // 处理缩进的内容（可能是子项）
    if (line.startsWith('  ') && currentTask) {
      const content = line.trim();
      if (content) {
        currentTask.items.push({
          content,
          isSubTask: true
        });
      }
    }
  });

  if (currentSlot) {
    slots.push(currentSlot);
  }

  return slots;
}

// 获取概要计划
export function getSummaryPlan(markdown) {
  if (!markdown) return {};

  const lines = markdown.split('\n');
  const plans = {};
  let currentTitle = null;
  let currentContent = [];
  let isDaily = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // 检查二级标题
    const titleMatch = line.match(/^##\s+(.+)$/);
    if (titleMatch) {
      if (currentTitle && currentContent.length > 0 && !isDaily) {
        plans[currentTitle] = parseSummaryContent(currentContent.join('\n'));
      }
      currentTitle = titleMatch[1];
      currentContent = [];
      isDaily = currentTitle === '每日学习计划（2小时为单位）';
      continue;
    }

    // 如果不是每日计划，就收集内容
    if (!isDaily) {
      currentContent.push(line);
    }
  }

  // 处理最后一个计划
  if (currentTitle && currentContent.length > 0 && !isDaily) {
    plans[currentTitle] = parseSummaryContent(currentContent.join('\n'));
  }

  return plans;
}

// 获取基本信息
export function getBasicInfo(markdown) {
  if (!markdown) return {};
  const data = parseMarkdownToObject(markdown);
  return data.basicInfo || {};
}

// 解析日期字符串为Date对象
export function parseDateString(dateStr) {
  const match = dateStr.match(/(\d+)月(\d+)日/);
  if (!match) return null;
  
  const currentYear = new Date().getFullYear();
  const month = parseInt(match[1]) - 1; // JavaScript月份从0开始
  const day = parseInt(match[2]);
  
  return new Date(currentYear, month, day);
}

// 解析每日计划内容为结构化数据
export function parseDailyPlanContent(content) {
  if (!content) return [];

  const lines = content.split('\n');
  const timeSlots = [];
  let currentTimeSlot = null;
  let currentTask = null;

  lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    // 匹配时间段（例如：上午时段（2小时）：考试大纲解析与复习规划）
    const timeSlotMatch = line.match(/^[-•]?\s*(.+?)(?:时段)?（(.+?)）：(.+)$/);
    if (timeSlotMatch) {
      if (currentTimeSlot) {
        timeSlots.push(currentTimeSlot);
      }
      currentTimeSlot = {
        title: `${timeSlotMatch[1]}时段（${timeSlotMatch[2]}）：${timeSlotMatch[3]}`,
        description: timeSlotMatch[3] || '',
        tasks: []
      };
      currentTask = null;
      return;
    }

    // 匹配"第X个小时："
    const hourMatch = line.match(/^[-•]?\s*第([一二三四五六七八九十\d]+)个小时：?(.*)$/);
    if (hourMatch && currentTimeSlot) {
      currentTask = {
        title: `第${hourMatch[1]}个小时${hourMatch[2] ? `：${hourMatch[2]}` : ''}`,
        items: [],
        isTimePoint: true
      };
      currentTimeSlot.tasks.push(currentTask);
      return;
    }

    // 匹配任务（例如：任务1：熟悉考试大纲（40分钟））
    const taskMatch = line.match(/^[-•]?\s*任务(\d+|[一二三四五六七八九十])(?:个小时)?[：:]\s*(.+?)(?:\s*（(.+?)）)?$/);
    if (taskMatch && currentTimeSlot) {
      currentTask = {
        title: `任务${taskMatch[1]}：${taskMatch[2]}${taskMatch[3] ? ` （${taskMatch[3]}）` : ''}`,
        items: [],
        isTimePoint: false
      };
      currentTimeSlot.tasks.push(currentTask);
      return;
    }

    // 处理列表项（以 - 或 • 开头的行）
    const listItemMatch = line.match(/^[-•]\s+(.+)$/);
    if (listItemMatch) {
      const content = listItemMatch[1];
      // 如果当前有任务上下文，就添加到任务的子项中
      if (currentTask) {
        currentTask.items.push({
          content,
          isSubTask: !currentTask.isTimePoint // 如果父任务不是时间点，这个就是子任务
        });
      }
      // 否则添加到时间段的直接子项中
      else if (currentTimeSlot) {
        if (!currentTimeSlot.items) {
          currentTimeSlot.items = [];
        }
        currentTimeSlot.items.push({
          content,
          isSubTask: false
        });
      }
      return;
    }

    // 其他内容行（可能是任务的子项）
    if (line.startsWith(' ') && currentTask) {
      currentTask.items.push({
        content: line.trim(),
        isSubTask: !currentTask.isTimePoint
      });
    }
  });

  if (currentTimeSlot) {
    timeSlots.push(currentTimeSlot);
  }

  return timeSlots;
}
