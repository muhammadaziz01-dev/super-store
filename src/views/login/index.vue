<script setup lang="ts">
import Container from "../../components/container/container/index.vue";
import LoginForm from "../../components/form/login-form.vue";
</script>

<template>
  <section class="login"> 
    <div class="login--wrapper">
      <img
        src="../../assets/images/login-img1.png"
        class="login--wrapper--img"
        alt="login img"
      />
      <img
        src="../../assets/images/login-bg-icon.png"
        class="login--wrapper--icon"
        alt="login icon"
      />

      <Container>
        <div class="login--wrapper--parent-form">
          <LoginForm />
        </div>
      </Container>
    </div>
  </section>
</template>

<style scoped lang="scss" src="./style.scss"></style>
