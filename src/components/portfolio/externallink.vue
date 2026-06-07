<template>
  <component
    :is="isExternal ? 'a' : 'router-link'"
    :href="isExternal ? linkUrl : undefined"
    :to="!isExternal ? linkUrl : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="external-link-component"
    v-bind="$attrs"
  >
    <slot></slot>
    <span v-if="isExternal && showExternalIcon" class="external-icon">
      <slot name="external-icon">
        <span class="external-arrow">↗</span>
      </slot>
    </span>
  </component>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { isExternalLink, getLinkByKey } from '@/utils/external-links'

  interface Props {
    /** 链接key（从配置文件读取） */
    linkKey?: string
    /** 直接的链接地址（优先级高于linkKey） */
    url?: string
    /** 是否显示外部链接图标 */
    showExternalIcon?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    showExternalIcon: true
  })

  const router = useRouter()
  const linkUrl = ref('')

  const isExternal = computed(() => isExternalLink(linkUrl.value))

  onMounted(async () => {
    if (props.url) {
      linkUrl.value = props.url
    } else if (props.linkKey) {
      const url = await getLinkByKey(props.linkKey)
      if (url) {
        linkUrl.value = url
      }
    }
  })
</script>

<style scoped lang="scss">
  .external-link-component {
    color: var(--el-color-primary);
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
  }

  .external-icon {
    margin-left: 4px;
    font-size: 0.8em;
    opacity: 0.7;
  }
</style>
