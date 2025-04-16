export function useSharedState() {
  const isSidebarOpen = useState('isSidebarOpen', () => false)

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  return {
    isSidebarOpen,
    toggleSidebar,
  }
}
