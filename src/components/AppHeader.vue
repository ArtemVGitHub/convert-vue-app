<template>
  <header class="navbar">
    <nav class="nav">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="nav-link"
        active-class="nav-link--active"
      >
        {{ link.text }}
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
const links = [
  { text: "Главная", to: "/" },
  { text: "Конвертация", to: "/convert" },
];
</script>

<style lang="scss" scoped>
.navbar {
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;

  .nav {
    display: flex;
    gap: 32px;

    .nav-link {
      position: relative;
      font-weight: bold;
      transition: all 0.3s ease-in-out;
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      font-size: 0.875em;
      letter-spacing: 0.25em;

      &:hover {
        color: var(--primary-color);
      }

      &::before {
        position: absolute;
        top: 100%;
        height: 1px;
        width: 100%;
        background-color: var(--primary-color);
        transition: all 0.3s ease-in-out;
        transform: scaleX(0);
      }

      &:hover::before {
        transform: scaleX(1);
      }

      &--active {
        color: var(--primary-color);
      }

      &--active::before {
        transform: scaleX(1);
      }
    }
  }
}
</style>
