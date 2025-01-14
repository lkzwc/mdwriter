'use client'
import { Pen, Eye, Sparkles, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">更优雅</span>
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
              <a href="/editor/new" className="px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl">
                开始创作
              </a>
              <a href="/guide" className="px-8 py-3 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium transition-colors">
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
              <img 
                src="/editor-preview.png" 
                alt="MDWriter 编辑器预览" 
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
            className="inline-block px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
          >
            免费开始使用
          </a>
        </motion.div>
      </section>
    </main>
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
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
}
