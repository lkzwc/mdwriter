'use client'

import { useState, useEffect } from 'react'

const DB_NAME = 'mdwriter'
const STORE_NAME = 'drafts'
const DB_VERSION = 1

export function useDrafts() {
  const [drafts, setDrafts] = useState([])
  const [db, setDb] = useState(null)

  // 初始化数据库
  useEffect(() => {
    if (typeof window === 'undefined') return

    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = (event) => {
      console.error('数据库打开失败:', event)
    }

    request.onsuccess = (event) => {
      const db = event.target.result
      setDb(db)
      loadDrafts(db)
    }

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }
  }, [])

  // 加载所有草稿
  const loadDrafts = async (database) => {
    if (!database) return
    const transaction = database.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()

    request.onsuccess = () => {
      setDrafts(request.result)
    }
  }

  // 保存草稿
  const saveDraft = async (draft) => {
    if (!db) return

    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    
    // 如果草稿数量已达到3个且不是更新现有草稿，则不允许保存
    if (drafts.length >= 3 && !draft.id) {
      throw new Error('草稿数量已达到上限')
    }

    const request = draft.id 
      ? store.put(draft)
      : store.add({
          ...draft,
          date: new Date().toISOString().split('T')[0]
        })

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        loadDrafts(db)
        resolve()
      }
      request.onerror = () => reject(request.error)
    })
  }

  // 删除草稿
  const deleteDraft = async (id) => {
    if (!db) return

    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.delete(id)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        loadDrafts(db)
        resolve()
      }
      request.onerror = () => reject(request.error)
    })
  }

  return {
    drafts,
    saveDraft,
    deleteDraft
  }
}