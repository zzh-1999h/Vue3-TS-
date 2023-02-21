import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Loading',
  render() {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox="0 0 1024 1024"
        class="loading"
      >
        <path
          fill="currentColor"
        ></path>
      </svg>
    )
  }
})