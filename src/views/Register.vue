<template>
    <div class="ls-box">
        <div class="container">
            <div class="ls-box__container">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="ls-box-content">
                            <h2 class="mb-5">Registrati</h2>
                            <form class="ls-form" @submit.prevent="authClient">
                                <div class="ls-box-input">
                                    <i class="fa-solid fa-user"></i>
                                    <input
                                        v-model="name"
                                        id="name"
                                        type="text"
                                        placeholder="Nome"
                                        required
                                    />
                                </div>
                                <div class="ls-box-input">
                                    <i class="fa-regular fa-user"></i>
                                    <input
                                        v-model="surname"
                                        id="surname"
                                        type="text"
                                        placeholder="Cognome"
                                        required
                                    />
                                </div>
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
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <div class="ls-box-input">
                                    <i class="fa-solid fa-unlock-keyhole"></i>
                                    <input
                                        v-model="password_confirmation"
                                        id="password_confirmation"
                                        type="password"
                                        placeholder="Conferma Password"
                                        required
                                    />
                                </div>
                                <div class="ls-botton-box mt-5">
                                    <div
                                        class="ls-button"
                                        @click="authClient()"
                                    >
                                        Registrati
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-6 d-none d-md-block">
                        <div class="ls-box-image">
                            <img
                                src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
                                alt="Sedia e PC"
                            />
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
    name: "Register",
    data() {
        return {
            name: "",
            surname: "",
            email: "",
            password: "",
            password_confirmation: "",
        };
    },
    setup() {
        const store = useStore();
        return {
            getUser: computed(() => store.getters.getUser),
        };
    },
    methods: {
        authClient() {
            let payload = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
            };
            this.$store
                .dispatch("register", payload)
                .then(() => this.$router.push("/"))
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
        margin: 0px auto;
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
