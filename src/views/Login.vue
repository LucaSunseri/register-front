<template>
    <div class="ls-box">
        <div class="container">
            <div class="ls-box__container">
                <div class="row">
                    <div class="col-6 d-none d-md-block">
                        <div class="ls-box-image">
                            <img
                                src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg"
                                alt="Sedia e PC"
                            />
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="ls-box-content">
                            <h2 class="mb-5">Entra</h2>
                            <form class="ls-form" @submit.prevent="authClient">
                                <div class="ls-box-input">
                                    <i class="fa-solid fa-envelope"></i>
                                    <input
                                        v-model="email"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div class="ls-box-input">
                                    <i class="fa-solid fa-lock"></i>
                                    <input
                                        v-model="password"
                                        type="password"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <div class="ls-botton-box mt-5">
                                    <div
                                        class="ls-button"
                                        @click="authClient()"
                                    >
                                        Entra
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    setup() {
        const store = useStore();
        return {
            getUser: computed(() => store.getters.getUser),
        };
    },
    mounted() {},
    methods: {
        authClient() {
            let payload = {
                email: this.email,
                password: this.password,
            };
            this.$store
                .dispatch("login", payload)
                .then(() => this.$router.push({ name: "home" }))
                .catch((error) => console.log(error));
        },
    },
};
</script>

<style lang="scss" scoped>
.ls-box {
    width: 100%;
    height: 100%;
    background-color: #f8f8f8;
    overflow: auto;
    .container {
        height: 100%;
    }
    .ls-box__container {
        width: 60%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .row {
            background-color: white;
            border-radius: 25px;
            padding: 75px 0;
            margin: 25px 0;
            .ls-box-content {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding-left: 25px;
            }
            .ls-box-image {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img {
                    width: 80%;
                }
            }
            .ls-form {
                width: 100%;
                padding-right: 25px;
                .ls-box-input {
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #999;
                    margin-bottom: 25px;
                    input {
                        margin-left: 15px;
                        width: 100%;
                        border: none;
                        &:focus {
                            outline: none;
                        }
                    }
                }
                .ls-button {
                    display: inline-block;
                    padding: 15px 39px;
                    border-radius: 5px;
                    background-color: #6dabe4;
                    color: #fff;
                    cursor: pointer;
                    &:hover {
                        background-color: #4292dc;
                    }
                }
            }
        }
    }
}

input::-webkit-input-placeholder {
    color: #999;
}
input:focus::-webkit-input-placeholder {
    color: black;
}
</style>
