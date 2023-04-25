import { onMounted } from 'vue';

export default (selector: string, onLoad: () => void) => {
  const observer = new IntersectionObserver((entries) => {
    const el = entries[0];
    if(el.isIntersecting) {
      onLoad();
    }
  }, { root: null, rootMargin: '250px' });

  onMounted(() => {
    const el = document.querySelector(selector);
    if(!el) throw new Error('Элемент не найден на странице');
    observer.observe(el);
  });
}
