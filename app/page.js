"use client";
import { Pen, Eye, Sparkles, Users, Check, Zap, Crown, Rocket, Layout, Palette, Newspaper } from "lucide-react";
import { HeroUIProvider } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <HeroUIProvider>
      <main className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              className="absolute top-0 -left-4 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-0 -right-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                delay: 2,
              }}
            />
            <motion.div
              className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                delay: 4,
              }}
            />
          </div>

          <div className="container mx-auto px-6 pt-32 pb-20">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.h1
                className="text-6xl font-bold text-gray-900 dark:text-white mb-6"
                variants={fadeInUp}
              >
                让公众号创作
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                  更优雅
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 mb-10"
                variants={fadeInUp}
              >
                使用 Markdown，告别繁琐排版
                <br />
                让创作回归内容本身
              </motion.p>
              <motion.div
                className="flex gap-4 justify-center"
                variants={fadeInUp}
              >
                <a
                  href="/editor"
                  className="px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:ring-2 ring-violet-400"
                >
                  开始创作
                </a>
                <a
                  href="/guide"
                  className="px-8 py-3 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium transition-colors"
                >
                  使用指南
                </a>
              </motion.div>
            </motion.div>

            {/* Preview */}
            <motion.div
              className="mt-20 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-transparent" />
                <Image
                  src="/editor-preview.png"
                  alt="MDWriter 编辑器预览"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20" id="features">
          <div className="container mx-auto px-6">
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              <FeatureCard
                icon={<Pen className="w-6 h-6" />}
                title="Markdown 创作"
                description="使用 Markdown 语法，专注于内容创作"
              />
              <FeatureCard
                icon={<Eye className="w-6 h-6" />}
                title="实时预览"
                description="所见即所得，实时查看效果"
              />
              <FeatureCard
                icon={<Sparkles className="w-6 h-6" />}
                title="主题样式"
                description="多种精美主题，一键切换"
              />
              <FeatureCard
                icon={<Users className="w-6 h-6" />}
                title="多号管理"
                description="统一管理多个公众号"
              />
            </motion.div>
          </div>
        </section>

        {/* Themes Section */}
        <section className="py-20 bg-gradient-to-b from-white to-violet-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                精美主题，一键切换
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                6+ 预设主题，完美适配公众号排版
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Layout className="w-12 h-12" />,
                  name: "简约主题",
                  description: "清新简约，突出内容"
                },
                {
                  icon: <Palette className="w-12 h-12" />,
                  name: "科技主题",
                  description: "现代科技感设计"
                },
                {
                  icon: <Newspaper className="w-12 h-12" />,
                  name: "杂志主题",
                  description: "专业排版样式"
                }
              ].map((theme, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900 dark:to-indigo-900 p-8 flex items-center justify-center">
                    <div className="text-violet-600 dark:text-violet-400">
                      {theme.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {theme.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {theme.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                选择适合你的计划
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                7天免费体验，升级获取更多功能
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  免费版
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  7天免费体验全部功能
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    Markdown 编辑
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    实时预览
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    基础主题
                  </li>
                </ul>
                <a
                  href="/register"
                  className="block w-full py-3 px-6 text-center text-white bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
                >
                  免费开始
                </a>
              </motion.div>

              {/* Pro Plan */}
              <motion.div
                className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl shadow-lg p-8 transform scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">Pro</h3>
                  <span className="px-3 py-1 text-sm bg-white/20 text-white rounded-full">
                    推荐
                  </span>
                </div>
                <p className="text-white/90 mb-6">适合个人创作者</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-white">
                    <Check className="w-5 h-5 mr-2" />
                    管理5个公众号
                  </li>
                  <li className="flex items-center text-white">
                    <Check className="w-5 h-5 mr-2" />
                    所有主题模板
                  </li>
                  <li className="flex items-center text-white">
                    <Check className="w-5 h-5 mr-2" />
                    主题自定义
                  </li>
                  <li className="flex items-center text-white">
                    <Check className="w-5 h-5 mr-2" />
                    优先支持
                  </li>
                </ul>
                <a
                  href="/pricing"
                  className="block w-full py-3 px-6 text-center text-violet-600 bg-white hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  升级 Pro
                </a>
              </motion.div>

              {/* Pro+ Plan */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Pro+
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  适合团队和机构
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    管理100个公众号
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    所有 Pro 功能
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    团队协作
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    专属支持
                  </li>
                </ul>
                <a
                  href="/pricing"
                  className="block w-full py-3 px-6 text-center text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 rounded-lg font-medium transition-colors"
                >
                  升级 Pro+
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 bg-gradient-to-b from-violet-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                开始创作只需三步
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                简单快速，即刻开始
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Pen className="w-8 h-8" />,
                  title: "创作内容",
                  description: "使用 Markdown，专注于写作",
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "挑选主题",
                  description: "一键切换，实时预览",
                },
                {
                  icon: <Rocket className="w-8 h-8" />,
                  title: "发布文章",
                  description: "一键发布到公众号",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900 dark:to-indigo-900 rounded-xl flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 left-2/3 w-1/3 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
          <motion.div
            className="container mx-auto px-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              准备好开始创作了吗？
            </h2>
            <a
              href="/register"
              className="inline-block px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:ring-2 ring-violet-400"
            >
              免费开始使用
            </a>
          </motion.div>
        </section>
      </main>
    </HeroUIProvider>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all"
      variants={fadeInUp}
    >
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/50 dark:to-indigo-900/50 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}
