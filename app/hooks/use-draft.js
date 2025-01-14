'use client'
import { useCallback } from 'react';

const DRAFT_KEY = 'mdwriter_drafts';
const MAX_DRAFTS = 3;

export function useDraft() {
  const loadDrafts = useCallback(() => {
    if (typeof window === 'undefined') return [];
    
    try {
      const drafts = localStorage.getItem(DRAFT_KEY);
      return drafts ? JSON.parse(drafts) : [];
    } catch (error) {
      console.error('Failed to load drafts:', error);
      return [];
    }
  }, []);

  const saveDraft = useCallback(async (content) => {
    if (typeof window === 'undefined') return;
    
    try {
      const drafts = loadDrafts();
      const newDraft = {
        id: Date.now(),
        content,
        updatedAt: new Date().toISOString(),
      };

      // 将新草稿添加到开头
      drafts.unshift(newDraft);

      // 保持最多3个草稿
      if (drafts.length > MAX_DRAFTS) {
        drafts.length = MAX_DRAFTS;
      }

      localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
      return newDraft;
    } catch (error) {
      console.error('Failed to save draft:', error);
      throw new Error('保存草稿失败');
    }
  }, [loadDrafts]);

  const deleteDraft = useCallback(async (draftId) => {
    if (typeof window === 'undefined') return;
    
    try {
      const drafts = loadDrafts();
      const newDrafts = drafts.filter(draft => draft.id !== draftId);
      localStorage.setItem(DRAFT_KEY, JSON.stringify(newDrafts));
    } catch (error) {
      console.error('Failed to delete draft:', error);
      throw new Error('删除草稿失败');
    }
  }, [loadDrafts]);

  return {
    loadDrafts,
    saveDraft,
    deleteDraft,
  };
} 