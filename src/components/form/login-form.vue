<template>
  <form class="form" @submit.prevent="handelSubmitted">
    <h3>Super-Store moduli</h3>
    <p>Savdo tizimini boshqarish va mukammallashtirish</p>
    <label for="login" class="form--label">
      <input type="text" placeholder="Login" v-model="user.login" required />
      <img :src="User" alt="User icon" />
    </label>
    <label for="login" class="form--label">
      <input
        :type="isOpen ? 'password' : 'text'"
        placeholder="Parol"
        v-model="user.password"
        required
      />
      <img @click="toggleOpen" :src="isOpen ? Open : Clos" alt=" icon" />
    </label>
    <button type="submit">Kirish</button>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import {useRouter} from "vue-router"
import { toast } from "vue3-toastify";
import {type LoginUserData} from "../../types"
import User from "../../assets/icons/user.svg";
import Open from "../../assets/icons/open.svg";
import Clos from "../../assets/icons/clos.svg";
import {setCookies } from "../../utils/cookie"

const isOpen = ref(true);
const router = useRouter()
const toggleOpen = (): void => {
  isOpen.value = !isOpen.value;
};
const user: LoginUserData = reactive({
  login: "",
  password: "",
});

const handelSubmitted = (): void => {
  if (user.login.trim() && user.password.trim()) {
    toast.success("Login successful!");
    setCookies("role" , user.login.trim())
    setCookies("token", user.password.trim())
    console.log("User login  : " + user.login  + " " +"User password : " + user.password )
    let role: string = user.login
    user.login = "";
    user.password = ""; 
    setTimeout(():void=>{
        if(role == "admin"){
            router.push('/admin')  // redirect to admin dashboard
        }else if (role == "super-admin"){
            router.push('/super-admin')  // redirect to super-admin dashboard
        }else {
            toast.error("Invalid user or password!");
            user.login = "";
            user.password = "";
            isOpen.value = false;
            setTimeout(():void=>{
                router.push('/')  // redirect to home page
            },1500)
        }
    },1500)
    
  } else {
    toast.error("Please fill in both fields!");
  }
};
</script>

<style scoped lang="scss">
:root {
  --gradient-border: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 30%,
    rgba(166, 176, 231, 1) 100%
  );
}
.form {
  display: flex;
  width: 540px;
  height: 515px;
  padding: 65px 45px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  border: 2px solid transparent;
  //   -webkit-border-radius: 30px;
  //   border-image: linear-gradient(to bottom , #FFF, #A6B0E7) 1;
  border-radius: 30px !important;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(2px);
  position: relative;
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    width: 100% ;
    height: 100%;
    z-index: -1;
    top: -1.5px;
    border-radius: 30px;
    padding: 1.5px;
    background: linear-gradient(170deg, #fff, #a6b0e7);
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
  }

  h3 {
    color: #444655;
    text-align: center;
    font-family: Poppins;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
  }

  p {
    width: 280px;
    color: #444655;
    text-align: center;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-top: 15px;
    margin-bottom: 40px;
  }
  &--label {
    width: 450px;
    height: 70px;
    flex-shrink: 0;
    border-radius: 15px;
    border: 1px solid rgba(116, 128, 156, 0.6);
    background: #fff;
    position: relative;
    margin-bottom: 30px;

    input {
      width: 100%;
      height: 100%;
      padding: 20px 65px 20px 20px;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      border: none;
      outline: none;
      background: transparent;
      color: #74809C;
      
      ::placeholder {
       color: rgba(116, 128, 156, 0.6);
        font-family: Poppins;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

    img {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
  }

  button {
    width: 450px;
    height: 70px;
    flex-shrink: 0;
    border-radius: 15px;
    background: #0079fe;
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    border: none;
    cursor: pointer;
    transition: all 0.4s linear;

    &:hover {
      background: #0060cc;
    }

    &:active {
      background: #0079fe;
    }
  }
}
</style>
