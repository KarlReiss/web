<template>
  <Teleport to="body">
    <div
      v-show="showButton"
      ref="dragButton"
      class="drag-home-btn"
      :style="buttonStyle"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <ArtSvgIcon icon="ri:home-4-line" class="home-icon" />
      <span class="home-text">{{ $t('topBar.home') }}</span>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/modules/user'
  import ArtSvgIcon from '@/components/core/base/art-svg-icon/index.vue'

  defineOptions({ name: 'DragHomeButton' })

  const router = useRouter()
  const userStore = useUserStore()

  const dragButton = ref<HTMLElement | null>(null)
  const position = ref({ x: 20, y: 20 })

  const showButton = computed(() => userStore.isLogin)

  const buttonStyle = computed(() => ({
    left: `${position.value.x}px`,
    top: `${position.value.y}px`
  }))

  const startDrag = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    let startX = clientX
    let startY = clientY
    let hasMoved = false
    const moveThreshold = 5 // 移动阈值，超过这个距离判定为拖拽

    const button = dragButton.value
    let offsetX = 0
    let offsetY = 0

    if (button) {
      const rect = button.getBoundingClientRect()
      offsetX = clientX - rect.left
      offsetY = clientY - rect.top
    }

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const cx = 'touches' in e ? e.touches[0].clientX : e.clientX
      const cy = 'touches' in e ? e.touches[0].clientY : e.clientY

      // 检测是否超过移动阈值
      if (Math.abs(cx - startX) > moveThreshold || Math.abs(cy - startY) > moveThreshold) {
        hasMoved = true
      }

      let newX = cx - offsetX
      let newY = cy - offsetY

      if (button) {
        newX = Math.max(10, Math.min(newX, window.innerWidth - button.offsetWidth - 10))
        newY = Math.max(10, Math.min(newY, window.innerHeight - button.offsetHeight - 10))
      }

      position.value = { x: newX, y: newY }
    }

    const handleUp = () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleUp)
      document.removeEventListener('touchmove', handleMove)
      document.removeEventListener('touchend', handleUp)

      // 只有没有发生移动时，才执行点击跳转
      if (!hasMoved) {
        router.push('/portfolio/home')
      } else {
        // 保存位置到 localStorage
        localStorage.setItem('dragHomeButtonPosition', JSON.stringify(position.value))
      }
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)
    document.addEventListener('touchmove', handleMove)
    document.addEventListener('touchend', handleUp)
  }

  onMounted(() => {
    const savedPosition = localStorage.getItem('dragHomeButtonPosition')
    if (savedPosition) {
      try {
        position.value = JSON.parse(savedPosition)
      } catch (e) {
        console.error('Failed to parse saved position:', e)
      }
    } else {
      const button = dragButton.value
      if (button) {
        position.value = {
          x: window.innerWidth - button.offsetWidth - 20,
          y: window.innerHeight - button.offsetHeight - 20
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
  .drag-home-btn {
    position: fixed;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    background: var(--el-color-primary);
    color: white;
    border-radius: 40px;
    cursor: grab;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    user-select: none;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    &:active {
      cursor: grabbing;
    }
  }

  .home-icon {
    width: 18px;
    height: 18px;
  }

  .home-text {
    font-size: 14px;
    font-weight: 500;
  }
</style>
