<template>
  <div class="portfolio-home">
    <!-- Hero 区域 -->
    <section class="hero">
      <div class="hero-glow"></div>
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span>{{ $t('portfolio.home.hero.badge') }}</span>
        </div>
        <h1 class="hero-title">
          <span class="gradient-text">{{ $t('portfolio.home.hero.title') }}</span>
        </h1>
        <p class="subtitle">{{ $t('portfolio.home.hero.subtitle') }}</p>
        <div class="hero-actions">
          <el-button
            type="primary"
            size="large"
            round
            @click="$router.push('/portfolio/projects')"
            class="primary-btn"
          >
            <span class="btn-content">
              {{ $t('portfolio.home.hero.viewProjects') }}
              <el-icon class="btn-icon"><ArrowRight /></el-icon>
            </span>
          </el-button>
          <el-button
            size="large"
            round
            @click="$router.push('/portfolio/about/frontend')"
            class="secondary-btn"
          >
            {{ $t('portfolio.home.hero.exploreSkills') }}
          </el-button>
        </div>
      </div>
    </section>

    <!-- 技能卡片 -->
    <section class="cards-section">
      <div class="section-header">
        <span class="section-tag">{{ $t('portfolio.home.sectionTag.skills') }}</span>
        <h2 class="section-title">{{ $t('portfolio.home.coreSkills') }}</h2>
      </div>
      <el-row :gutter="16">
        <el-col
          v-for="(item, index) in cards"
          :key="item.title"
          :xs="12"
          :sm="12"
          :md="6"
          class="card-col"
        >
          <div
            class="feature-card"
            @click="$router.push(item.link)"
            :style="{ '--delay': `${index * 0.1}s` }"
          >
            <div class="card-bg"></div>
            <div class="card-icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="card-arrow">
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>

    <!-- 亮点区域 -->
    <section class="highlights">
      <div class="section-header">
        <span class="section-tag">{{ $t('portfolio.home.sectionTag.highlights') }}</span>
        <h2 class="section-title">{{ $t('portfolio.home.whyMe') }}</h2>
      </div>
      <el-row :gutter="16">
        <el-col
          v-for="(item, index) in highlights"
          :key="item.title"
          :xs="24"
          :sm="12"
          :md="8"
          class="highlight-col"
        >
          <div class="highlight-item" :style="{ '--delay': `${index * 0.1}s` }">
            <div class="highlight-icon-wrapper">
              <div class="highlight-icon">{{ item.icon }}</div>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ArrowRight } from '@element-plus/icons-vue'

  defineOptions({ name: 'PortfolioHome' })

  const { t } = useI18n()

  const cards = computed(() => [
    {
      icon: '🎨',
      title: t('portfolio.home.cards[0].title'),
      desc: t('portfolio.home.cards[0].desc'),
      link: '/portfolio/about/frontend'
    },
    {
      icon: '⚙️',
      title: t('portfolio.home.cards[1].title'),
      desc: t('portfolio.home.cards[1].desc'),
      link: '/portfolio/about/backend'
    },
    {
      icon: '🤖',
      title: t('portfolio.home.cards[2].title'),
      desc: t('portfolio.home.cards[2].desc'),
      link: '/portfolio/about/ai'
    },
    {
      icon: '🔧',
      title: t('portfolio.home.cards[3].title'),
      desc: t('portfolio.home.cards[3].desc'),
      link: '/portfolio/about/hardware'
    }
  ])

  const highlights = computed(() => [
    {
      icon: '🚀',
      title: t('portfolio.home.highlights[0].title'),
      desc: t('portfolio.home.highlights[0].desc')
    },
    {
      icon: '💡',
      title: t('portfolio.home.highlights[1].title'),
      desc: t('portfolio.home.highlights[1].desc')
    },
    {
      icon: '🤝',
      title: t('portfolio.home.highlights[2].title'),
      desc: t('portfolio.home.highlights[2].desc')
    }
  ])
</script>

<style scoped lang="scss">
  .portfolio-home {
    animation: fadeInUp 0.6s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ========== Hero 区域 ========== */
  .hero {
    position: relative;
    text-align: center;
    padding: 72px 20px 64px;
    background: var(--el-fill-color-lighter);
    border-radius: 24px;
    margin-bottom: 48px;
    overflow: hidden;
  }

  .hero-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      rgba(var(--el-color-primary-rgb), 0.15) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    pointer-events: none;
    animation: glowPulse 4s ease-in-out infinite;
  }

  @keyframes glowPulse {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.8;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
      opacity: 1;
    }
  }

  .hero-content {
    position: relative;
    max-width: 640px;
    margin: 0 auto;
    z-index: 1;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: rgba(var(--el-color-primary-rgb), 0.1);
    border: 1px solid rgba(var(--el-color-primary-rgb), 0.2);
    border-radius: 100px;
    margin-bottom: 20px;
    animation: slideDown 0.6s ease-out 0.1s both;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    background: var(--el-color-primary);
    border-radius: 50%;
    animation: dotPulse 2s ease-in-out infinite;
  }

  @keyframes dotPulse {
    0%,
    100% {
      box-shadow: 0 0 0 0 rgba(var(--el-color-primary-rgb), 0.4);
    }
    50% {
      box-shadow: 0 0 0 6px rgba(var(--el-color-primary-rgb), 0);
    }
  }

  .hero-badge span {
    font-size: 0.8125rem;
    color: var(--el-color-primary);
    font-weight: 500;
  }

  .hero-title {
    margin: 0 0 12px;
    line-height: 1.2;
    animation: slideUp 0.6s ease-out 0.2s both;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .gradient-text {
    font-size: 2.5rem;
    background: linear-gradient(
      135deg,
      var(--el-color-primary) 0%,
      var(--el-color-primary-light-3) 50%,
      var(--el-color-primary) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 6s ease infinite;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .hero .subtitle {
    font-size: 1.0625rem;
    color: var(--el-text-color-secondary);
    margin: 0 0 32px;
    line-height: 1.6;
    animation: slideUp 0.6s ease-out 0.3s both;
  }

  .hero-actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    animation: slideUp 0.6s ease-out 0.4s both;
  }

  .btn-content {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .btn-icon {
    transition: transform 0.2s ease;
  }

  .primary-btn:hover .btn-icon {
    transform: translateX(3px);
  }

  .primary-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    &:hover::before {
      left: 100%;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(var(--el-color-primary-rgb), 0.35);
    }
  }

  .secondary-btn {
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      background: var(--el-fill-color-light);
    }
  }

  /* ========== 区块标题 ========== */
  .section-header {
    text-align: center;
    margin-bottom: 32px;
  }

  .section-tag {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    font-size: 0.75rem;
    color: var(--el-text-color-secondary);
    background: var(--el-fill-color);
    border-radius: 100px;
    margin-bottom: 10px;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  .section-title {
    font-size: 1.75rem;
    margin: 0;
    color: var(--el-text-color-primary);
    font-weight: 700;
  }

  /* ========== 技能卡片 ========== */
  .cards-section {
    margin-bottom: 56px;
  }

  .card-col {
    margin-bottom: 16px;
  }

  .feature-card {
    position: relative;
    text-align: center;
    cursor: pointer;
    height: 100%;
    padding: 28px 20px;
    border-radius: 20px;
    background: var(--el-bg-color);
    border: 1px solid var(--el-border-color-lighter);
    overflow: hidden;
    transition: all 0.3s ease;
    animation: cardIn 0.6s ease-out var(--delay, 0s) both;

    @keyframes cardIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .card-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(var(--el-color-primary-rgb), 0.05), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: translateY(-6px);
      border-color: rgba(var(--el-color-primary-rgb), 0.2);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);

      .card-bg {
        opacity: 1;
      }

      .card-icon {
        transform: scale(1.1);
      }

      .card-arrow {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .card-icon {
      position: relative;
      font-size: 2.75rem;
      margin-bottom: 14px;
      transition: transform 0.3s ease;
      z-index: 1;
    }

    h3 {
      position: relative;
      margin: 0 0 8px;
      font-size: 1rem;
      color: var(--el-text-color-primary);
      font-weight: 600;
      z-index: 1;
    }

    p {
      position: relative;
      color: var(--el-text-color-secondary);
      font-size: 0.8125rem;
      margin: 0;
      line-height: 1.6;
      z-index: 1;
    }

    .card-arrow {
      position: relative;
      margin-top: 16px;
      opacity: 0;
      transform: translateX(-8px);
      transition: all 0.3s ease;
      z-index: 1;

      .el-icon {
        font-size: 1.125rem;
        color: var(--el-color-primary);
      }
    }
  }

  /* ========== 亮点区域 ========== */
  .highlights {
    margin-bottom: 24px;
  }

  .highlight-col {
    margin-bottom: 16px;
  }

  .highlight-item {
    position: relative;
    text-align: center;
    padding: 32px 24px;
    border-radius: 20px;
    background: var(--el-bg-color);
    border: 1px solid var(--el-border-color-lighter);
    transition: all 0.3s ease;
    overflow: hidden;
    animation: cardIn 0.6s ease-out var(--delay, 0s) both;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(
        90deg,
        var(--el-color-primary),
        var(--el-color-primary-light-3),
        var(--el-color-primary)
      );
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      transform: translateY(-4px);
      border-color: rgba(var(--el-color-primary-rgb), 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);

      &::before {
        transform: scaleX(1);
      }

      .highlight-icon-wrapper {
        transform: scale(1.05);
      }
    }

    .highlight-icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      background: linear-gradient(
        135deg,
        rgba(var(--el-color-primary-rgb), 0.1),
        rgba(var(--el-color-primary-rgb), 0.05)
      );
      border-radius: 16px;
      margin-bottom: 16px;
      transition: transform 0.3s ease;
    }

    .highlight-icon {
      font-size: 1.75rem;
    }

    h3 {
      margin: 0 0 10px;
      font-size: 1rem;
      color: var(--el-text-color-primary);
      font-weight: 600;
    }

    p {
      color: var(--el-text-color-secondary);
      font-size: 0.875rem;
      margin: 0;
      line-height: 1.7;
    }
  }

  /* ========== 响应式 ========== */
  @media screen and (max-width: 768px) {
    .hero {
      padding: 48px 16px 40px;
      margin-bottom: 36px;
      border-radius: 20px;
    }

    .hero-glow {
      width: 300px;
      height: 300px;
    }

    .gradient-text {
      font-size: 1.875rem;
    }

    .hero .subtitle {
      font-size: 0.9375rem;
    }

    .section-title {
      font-size: 1.375rem;
    }

    .feature-card {
      padding: 24px 16px;
    }

    .highlight-item {
      padding: 24px 16px;
    }
  }

  @media screen and (max-width: 480px) {
    .hero {
      padding: 36px 12px 32px;
      border-radius: 16px;
    }

    .gradient-text {
      font-size: 1.5rem;
    }

    .hero .subtitle {
      font-size: 0.8125rem;
    }

    .hero-actions .el-button {
      font-size: 0.875rem;
      padding: 10px 20px;
    }

    .section-title {
      font-size: 1.25rem;
    }

    .card-col {
      margin-bottom: 12px;
    }

    .feature-card {
      padding: 20px 14px;
    }
  }
</style>
