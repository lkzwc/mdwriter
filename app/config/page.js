"use client";

import { useState } from "react";
import { User, Newspaper, Plus, Trash2, Edit, Eye, EyeOff } from "lucide-react";

export default function ConfigPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "测试公众号",
      appid: "wx1234567890",
      secret: "abcdef1234567890",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=1",
    },
  ]);
  const [showSecret, setShowSecret] = useState({});
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "",
    appid: "",
    secret: "",
  });

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.appid || !newAccount.secret) {
      alert("请填写完整信息");
      return;
    }

    setAccounts((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newAccount,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${Date.now()}`,
      },
    ]);
    setNewAccount({ name: "", appid: "", secret: "" });
    setIsAddingAccount(false);
  };

  const handleDeleteAccount = (id) => {
    if (confirm("确定要删除这个公众号吗？")) {
      setAccounts((prev) => prev.filter((account) => account.id !== id));
    }
  };

  const toggleSecretVisibility = (id) => {
    setShowSecret((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-50">
      <div className="flex h-full min-h-screen p-20">
        {/* 左侧导航 */}
        <div className="w-64 bg-white/80 backdrop-blur-sm shadow-lg m-4 rounded-2xl">
          <div className="space-y-2 p-4">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-2 transition-all
              ${
                activeTab === "profile"
                  ? "bg-violet-500 text-white shadow-md"
                  : "hover:bg-violet-50 text-gray-600 hover:text-violet-600"
              }`}
            >
              <User size={18} />
              我的信息
            </button>
            <button
              onClick={() => setActiveTab("accounts")}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-2 transition-all
              ${
                activeTab === "accounts"
                  ? "bg-violet-500 text-white shadow-md"
                  : "hover:bg-violet-50 text-gray-600 hover:text-violet-600"
              }`}
            >
              <Newspaper size={18} />
              公众号管理
            </button>
          </div>
        </div>

        {/* 右侧内容区 */}
        <div className="flex-1 p-8">
          {activeTab === "profile" ? (
            <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  个人信息
                </h2>
                <div className="w-full max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      用户名
                    </label>
                    <input
                      type="text"
                      placeholder="请输入用户名"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      邮箱
                    </label>
                    <input
                      type="email"
                      placeholder="请输入邮箱"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                    />
                  </div>
                  <div className="pt-4">
                    <button className="px-6 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all">
                      保存修改
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">公众号管理</h2>
                <button
                  onClick={() => setIsAddingAccount(true)}
                  className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Plus size={18} />
                  添加公众号
                </button>
              </div>

              {/* 公众号列表 */}
              <div className="grid grid-cols-1 gap-4">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl hover:shadow-xl transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-violet-100">
                            <img
                              src={account.avatar}
                              alt={account.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="text-lg font-bold text-gray-800">
                            {account.name}
                          </h3>
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="text-gray-500">AppID: </span>
                              <span className="font-mono text-gray-700">
                                {account.appid}
                              </span>
                            </div>
                            <div className="text-sm flex items-center gap-2">
                              <span className="text-gray-500">Secret: </span>
                              <span className="font-mono text-gray-700">
                                {showSecret[account.id]
                                  ? account.secret
                                  : "••••••••••••••••"}
                              </span>
                              <button
                                onClick={() =>
                                  toggleSecretVisibility(account.id)
                                }
                                className="p-1 hover:bg-violet-50 rounded-lg transition-colors"
                              >
                                {showSecret[account.id] ? (
                                  <EyeOff size={14} />
                                ) : (
                                  <Eye size={14} />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-violet-50 rounded-lg transition-colors text-gray-600 hover:text-violet-600">
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteAccount(account.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-600 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 添加公众号弹框 */}
        {isAddingAccount && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-[480px] max-w-[90vw]">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-800">添加公众号</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    公众号名称
                  </label>
                  <input
                    type="text"
                    placeholder="请输入公众号名称"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                    value={newAccount.name}
                    onChange={(e) =>
                      setNewAccount((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    AppID
                  </label>
                  <input
                    type="text"
                    placeholder="请输入 AppID"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all font-mono"
                    value={newAccount.appid}
                    onChange={(e) =>
                      setNewAccount((prev) => ({
                        ...prev,
                        appid: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Secret
                  </label>
                  <input
                    type="password"
                    placeholder="请输入 Secret"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all font-mono"
                    value={newAccount.secret}
                    onChange={(e) =>
                      setNewAccount((prev) => ({
                        ...prev,
                        secret: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="p-6 border-t flex justify-end gap-2">
                <button
                  onClick={() => setIsAddingAccount(false)}
                  className="px-6 py-2 border border-gray-200 hover:border-gray-300 rounded-xl transition-all text-gray-600 hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  onClick={handleAddAccount}
                  className="px-6 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  确认添加
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
