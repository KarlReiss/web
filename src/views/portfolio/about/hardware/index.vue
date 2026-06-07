<template>
  <div class="page">
    <div class="page-header">
      <span class="page-tag">{{ $t('portfolio.sectionTag.skills') }}</span>
      <h2 class="page-title">{{ $t('portfolio.about.hardware.title') }}</h2>
    </div>
    <el-row :gutter="16">
      <el-col
        v-for="(skill, index) in skills"
        :key="skill.name"
        :xs="24"
        :sm="12"
        :md="8"
        class="skill-col"
      >
        <div class="skill-card" :style="{ '--delay': `${index * 0.1}s` }">
          <div class="skill-icon-wrapper">
            <span class="skill-icon">{{ skill.icon }}</span>
          </div>
          <span class="skill-name">{{ skill.name }}</span>
          <div class="skill-progress-wrapper">
            <el-progress
              :percentage="skill.level"
              color="#f56c6c"
              :stroke-width="8"
              :show-text="true"
            />
          </div>
          <p class="skill-desc">{{ skill.desc }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  defineOptions({ name: 'PortfolioHardware' })

  const { t } = useI18n()

  const skills = computed(() => [
    {
      icon: '🔌',
      name: t('portfolio.about.hardware.skills[0].name'),
      level: 70,
      desc: t('portfolio.about.hardware.skills[0].desc')
    },
    {
      icon: '📡',
      name: t('portfolio.about.hardware.skills[1].name'),
      level: 75,
      desc: t('portfolio.about.hardware.skills[1].desc')
    },
    {
      icon: '🥧',
      name: t('portfolio.about.hardware.skills[2].name'),
      level: 80,
      desc: t('portfolio.about.hardware.skills[2].desc')
    },
    {
      icon: '🔧',
      name: t('portfolio.about.hardware.skills[3].name'),
      level: 60,
      desc: t('portfolio.about.hardware.skills[3].desc')
    },
    {
      icon: '🤖',
      name: t('portfolio.about.hardware.skills[4].name'),
      level: 55,
      desc: t('portfolio.about.hardware.skills[4].desc')
    },
    {
      icon: '📟',
      name: t('portfolio.about.hardware.skills[5].name'),
      level: 65,
      desc: t('portfolio.about.hardware.skills[5].desc')
    }
  ])
</script>

<style scoped lang="scss">
  .page {
    padding: 20px 0;
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

  .page-header {
    text-align: center;
    margin-bottom: 32px;
  }

  .page-tag {
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

  .page-title {
    margin: 0;
    font-size: 1.75rem;
    color: var(--el-text-color-primary);
    font-weight: 700;
  }

  .skill-col {
    margin-bottom: 16px;
  }

  .skill-card {
    position: relative;
    height: 100%;
    padding: 24px 20px;
    background: var(--el-bg-color);
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: all 0.3s ease;
    overflow: hidden;
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

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(var(--el-color-primary-rgb), 0.04), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    &:hover {
      transform: translateY(-6px);
      border-color: rgba(var(--el-color-primary-rgb), 0.2);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);

      &::before {
        opacity: 1;
      }
    }
  }

  .skill-icon-wrapper {
    display: flex;
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
    margin-bottom: 14px;
  }

  .skill-icon {
    font-size: 1.75rem;
  }

  .skill-name {
    font-weight: 600;
    font-size: 0.9375rem;
    color: var(--el-text-color-primary);
    margin-bottom: 12px;
  }

  .skill-progress-wrapper {
    width: 100%;
    margin-bottom: 10px;
  }

  .skill-desc {
    color: var(--el-text-color-secondary);
    font-size: 0.8125rem;
    line-height: 1.6;
    flex: 1;
  }

  /* ========== 响应式 ========== */
  @media screen and (max-width: 768px) {
    .page {
      padding: 12px 0;
    }

    .page-title {
      font-size: 1.375rem;
    }

    .skill-card {
      padding: 20px 16px;
    }

    .skill-name {
      font-size: 0.875rem;
    }
  }

  @media screen and (max-width: 480px) {
    .page-title {
      font-size: 1.25rem;
    }

    .skill-card {
      padding: 18px 14px;
    }

    .skill-icon {
      font-size: 1.5rem;
    }

    .skill-icon-wrapper {
      width: 48px;
      height: 48px;
      border-radius: 12px;
    }
  }
</style>
