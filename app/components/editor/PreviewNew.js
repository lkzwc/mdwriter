"use client";

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { useState, useEffect } from "react";
import remarkGfm from "remark-gfm";

export function Preview({ content, styles = {} }) {
  const [mdxSource, setMdxSource] = useState(null);

  useEffect(() => {
    const compile = async () => {
      try {
        const mdxSource = await serialize(content || "", {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            development: false
          }
        });
        setMdxSource(mdxSource);
      } catch (error) {
        console.error("Failed to compile markdown:", error);
      }
    };
    compile();
  }, [content]);

  const previewStyles = {
    "--text-color": styles.colors?.text || "#1f2937",
    "--heading-color": styles.colors?.heading || "#111827",
    "--link-color": styles.colors?.link || "#3b82f6",
    "--quote-color": styles.colors?.quote || "#4b5563",
    "--quote-border-color": styles.colors?.border || "#e5e7eb",
    "--background-color": styles.colors?.background || "#ffffff",
    "--headingBorder": styles.colors?.headingBorder || "#3b82f6",
    "--headingBackground": styles.colors?.headingBackground || "#f3f4f6",
    "--font-family": styles.bodyFont === "serif"
      ? "'Noto Serif', 'Source Serif Pro', Georgia, Cambria, 'Times New Roman', Times, serif"
      : "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    "--font-size": `${styles.fontSize || 16}px`,
    "--line-height": styles.lineHeight || 1.8,
    "--paragraph-spacing": `${styles.paragraphSpacing || 1.6}em`,
  };

  return (
    <div
      className="preview-content p-3"
      style={{
        ...previewStyles,
        color: "var(--text-color)",
        fontFamily: "var(--font-family)",
        fontSize: "var(--font-size)",
        lineHeight: "var(--line-height)",
        backgroundColor: "var(--background-color)",
      }}
    >
      <style jsx global>{`
        .preview-content {
          max-width: 100%;
          overflow-wrap: break-word;
        }
        
        .preview-content h1,
        .preview-content h2,
        .preview-content h3,
        .preview-content h4,
        .preview-content h5,
        .preview-content h6 {
          color: var(--heading-color);
          font-weight: 600;
          margin-top: calc(var(--paragraph-spacing) * 1.5);
          margin-bottom: var(--paragraph-spacing);
        }

        /* 混合标题样式 */
        ${styles.headingStyle === "mixed" ? `
          .preview-content h1 {
            text-align: center;
            background-color: var(--headingBackground);
            padding: 1em;
            border-radius: 8px;
            margin: 1.5em -0.5em;
            border: 2px solid var(--headingBorder);
          }
          
          .preview-content h2 {
            border-bottom: 2px solid var(--headingBorder);
            padding-bottom: 0.3em;
          }
          
          .preview-content h3 {
            border-left: 4px solid var(--headingBorder);
            padding-left: 0.8em;
            margin-left: -0.8em;
          }
          
          .preview-content h4 {
            position: relative;
            padding-left: 1em;
          }
          
          .preview-content h4::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0.5em;
            height: 0.5em;
            background-color: var(--headingBorder);
            border-radius: 50%;
          }
          
          .preview-content h5 {
            color: var(--headingBorder);
          }
          
          .preview-content h6 {
            font-style: italic;
            color: var(--quote-color);
          }
        ` : styles.headingStyle === "border" ? `
          .preview-content h1,
          .preview-content h2,
          .preview-content h3,
          .preview-content h4,
          .preview-content h5,
          .preview-content h6 {
            border-left: 4px solid var(--headingBorder);
            padding-left: 0.5em;
            margin-left: -0.5em;
          }
        ` : styles.headingStyle === "background" ? `
          .preview-content h1,
          .preview-content h2,
          .preview-content h3,
          .preview-content h4,
          .preview-content h5,
          .preview-content h6 {
            background-color: var(--headingBackground);
            padding: 0.5em;
            border-radius: 4px;
            margin-left: -0.5em;
            margin-right: -0.5em;
          }
        ` : styles.headingStyle === "underline" ? `
          .preview-content h1,
          .preview-content h2,
          .preview-content h3,
          .preview-content h4,
          .preview-content h5,
          .preview-content h6 {
            border-bottom: 2px solid var(--headingBorder);
            padding-bottom: 0.2em;
          }
        ` : styles.headingStyle === "simple" ? `
          .preview-content h1,
          .preview-content h2,
          .preview-content h3,
          .preview-content h4,
          .preview-content h5,
          .preview-content h6 {
            position: relative;
          }
          
          .preview-content h1::after,
          .preview-content h2::after,
          .preview-content h3::after,
          .preview-content h4::after,
          .preview-content h5::after,
          .preview-content h6::after {
            content: '';
            position: absolute;
            bottom: -0.2em;
            left: 0;
            width: 2em;
            height: 2px;
            background-color: var(--headingBorder);
          }
        ` : styles.headingStyle === "decorated" ? `
          .preview-content h1 {
            position: relative;
            text-align: center;
            background-color: var(--headingBackground);
            padding: 0.8em 2em;
            margin: 1.5em 0;
            border-radius: 8px;
            border: 2px solid var(--headingBorder);
          }
          
          .preview-content h1::before,
          .preview-content h1::after {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 24px;
            height: 24px;
            background-color: var(--headingBorder);
            mask-size: contain;
            mask-repeat: no-repeat;
            -webkit-mask-size: contain;
            -webkit-mask-repeat: no-repeat;
          }
          
          .preview-content h1::before {
            left: 12px;
            mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' /%3E%3C/svg%3E");
            -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' /%3E%3C/svg%3E");
          }
          
          .preview-content h1::after {
            right: 12px;
            mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' /%3E%3C/svg%3E");
            -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' /%3E%3C/svg%3E");
          }
          
          .preview-content h2 {
            position: relative;
            padding: 0.5em 1em;
            background-color: var(--headingBackground);
            border-radius: 4px;
            margin: 1em -0.5em;
          }
          
          .preview-content h2::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 2px solid var(--headingBorder);
            border-radius: 4px;
            opacity: 0.5;
          }
          
          .preview-content h3 {
            position: relative;
            padding-left: 1.2em;
            margin: 1em 0;
          }
          
          .preview-content h3::before {
            content: '❀';
            position: absolute;
            left: 0;
            color: var(--headingBorder);
          }
          
          .preview-content h4 {
            position: relative;
            padding-left: 1em;
            margin: 1em 0;
          }
          
          .preview-content h4::before {
            content: '✿';
            position: absolute;
            left: 0;
            color: var(--headingBorder);
            font-size: 0.8em;
          }
          
          .preview-content h5,
          .preview-content h6 {
            color: var(--headingBorder);
            font-style: italic;
          }
        ` : styles.headingStyle === "minimalist" ? `
          .preview-content h1 {
            position: relative;
            padding: 0.5em 0;
            margin: 1em 0;
            text-align: center;
          }
          
          .preview-content h1::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 2px;
            background-color: var(--headingBorder);
          }
          
          .preview-content h2 {
            position: relative;
            padding: 0.3em 0;
            margin: 1em 0;
          }
          
          .preview-content h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40px;
            height: 2px;
            background-color: var(--headingBorder);
          }
          
          .preview-content h3,
          .preview-content h4,
          .preview-content h5,
          .preview-content h6 {
            color: var(--heading-color);
            margin: 1em 0;
          }
        ` : styles.headingStyle === "cartoon" ? `
          .preview-content h1 {
            position: relative;
            text-align: center;
            background-color: var(--headingBackground);
            padding: 0.8em 1em;
            margin: 1.5em 0;
            border-radius: 30px;
            border: 3px solid var(--headingBorder);
          }
          
          .preview-content h1::before,
          .preview-content h1::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: var(--headingBorder);
            top: 50%;
            transform: translateY(-50%);
          }
          
          .preview-content h1::before {
            left: -10px;
          }
          
          .preview-content h1::after {
            right: -10px;
          }
          
          .preview-content h2 {
            position: relative;
            padding: 0.6em 1em;
            background-color: var(--headingBackground);
            border: 2px solid var(--headingBorder);
            border-radius: 15px;
            margin: 1em 0;
          }
          
          .preview-content h2::before {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 30px;
            width: 15px;
            height: 15px;
            background-color: var(--headingBackground);
            border-right: 2px solid var(--headingBorder);
            border-bottom: 2px solid var(--headingBorder);
            transform: rotate(45deg);
          }
          
          .preview-content h3 {
            position: relative;
            padding: 0.4em 0.8em;
            margin: 1em 0;
            color: #fff;
            background-color: var(--headingBorder);
            border-radius: 8px;
          }
          
          .preview-content h3::after {
            content: '';
            position: absolute;
            left: 20px;
            bottom: -8px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 8px 8px 0 8px;
            border-color: var(--headingBorder) transparent transparent transparent;
          }
          
          .preview-content h4 {
            position: relative;
            padding: 0.3em 0.8em;
            margin: 1em 0;
            border-bottom: 2px dashed var(--headingBorder);
          }
          
          .preview-content h4::before {
            content: '✧';
            margin-right: 8px;
            color: var(--headingBorder);
          }
          
          .preview-content h5 {
            position: relative;
            padding: 0.2em 0.6em;
            margin: 1em 0;
            color: var(--headingBorder);
          }
          
          .preview-content h5::before {
            content: '♡';
            margin-right: 6px;
          }
          
          .preview-content h6 {
            position: relative;
            padding: 0.2em 0.6em;
            margin: 1em 0;
            color: var(--headingBorder);
            font-style: italic;
          }
          
          .preview-content h6::before {
            content: '⋆';
            margin-right: 6px;
          }
        ` : ''}
        
        .preview-content h1 { font-size: 2em; }
        .preview-content h2 { font-size: 1.5em; }
        .preview-content h3 { font-size: 1.25em; }
        .preview-content h4 { font-size: 1em; }
        .preview-content h5 { font-size: 0.875em; }
        .preview-content h6 { font-size: 0.85em; }
        
        .preview-content p {
          margin-top: 0;
          margin-bottom: var(--paragraph-spacing);
        }
        
        .preview-content a {
          color: var(--link-color);
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
        
        .preview-content blockquote {
          margin: var(--paragraph-spacing) 0;
          ${styles.quoteStyle === "border" ? `
            border-left: 4px solid var(--quote-border-color);
            padding-left: 1em;
            color: var(--quote-color);
          ` : styles.quoteStyle === "background" ? `
            background-color: var(--quote-border-color);
            padding: 1em;
            border-radius: 4px;
            color: var(--quote-color);
          ` : styles.quoteStyle === "modern" ? `
            border-left: 2px solid var(--quote-border-color);
            background-color: color-mix(in srgb, var(--quote-border-color) 10%, transparent);
            padding: 1em;
            border-radius: 2px;
            color: var(--quote-color);
          ` : ''}
        }
        
        .preview-content blockquote p {
          margin: 0;
        }
        
        .preview-content img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: var(--paragraph-spacing) 0;
        }
        
        .preview-content pre {
          background-color: #1f2937;
          color: #e5e7eb;
          padding: 1em;
          border-radius: 4px;
          overflow-x: auto;
          margin: var(--paragraph-spacing) 0;
        }
        
        .preview-content code {
          background-color: color-mix(in srgb, var(--text-color) 10%, transparent);
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-size: 0.9em;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }
        
        .preview-content pre code {
          background-color: transparent;
          padding: 0;
          border-radius: 0;
          color: inherit;
        }
        
        .preview-content ul,
        .preview-content ol {
          margin-top: var(--paragraph-spacing);
          margin-bottom: var(--paragraph-spacing);
          padding-left: 1.5em;
        }
        
        .preview-content li {
          margin-top: calc(var(--paragraph-spacing) * 0.3);
          margin-bottom: calc(var(--paragraph-spacing) * 0.3);
        }

        /* Task List 样式 */
        .preview-content input[type="checkbox"] {
          margin-right: 0.5em;
        }
        
        .preview-content table {
          width: 100%;
          border-collapse: collapse;
          margin: var(--paragraph-spacing) 0;
          display: block;
          overflow-x: auto;
        }
        
        .preview-content th,
        .preview-content td {
          border: 1px solid var(--quote-border-color);
          padding: 0.5em;
        }
        
        .preview-content th {
          background-color: color-mix(in srgb, var(--quote-border-color) 10%, transparent);
          font-weight: 600;
        }

        /* 删除线 */
        .preview-content del {
          color: var(--quote-color);
        }

        /* 水平分割线 */
        .preview-content hr {
          border: none;
          border-top: 1px solid var(--quote-border-color);
          margin: var(--paragraph-spacing) 0;
        }
      `}</style>
      {mdxSource ? <MDXRemote {...mdxSource} /> : null}
    </div>
  );
}