<template>
  <div class="home">
    <UserInput />
  </div>
</template>

<script>
// @ is an alias to /src
import UserInput from "@/components/UserInput.vue";

export default {
  name: "Home",
  components: {
    UserInput
  }
};
</script>
