<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
        </div>

        <ProductBox 
        v-for="product in category.products"
        v-bind:key="product.id"
        v-bind:product="product" />
    </div>
</template>

<script>
import axios from 'axios'
import{ toast } from 'bulma-toast'
import ProductBox from '@/components/ProductBox'

export default {
    name: 'Category',
    components: {
        ProductBox
    },
    data() {
        return {
            category: {
                products: []
            }
        }
    },
    //get Category from the back-end
    mounted() {
        this.getCategory()
    },
    //This is a Vue.js watcher for the $route property. The $route property
    //is a built-in property in Vue.js that contains information about the current route of the application.
    watch: {
        $route(to, from) {
            if (to.name === 'Category') {
                this.getCategory()
            }
        }

    },
    //then create the getCategory function, set the async to use the loading bar
    methods: {
        async getCategory() {
            const categorySlug = this.$route.params.category_slug

            this.$store.commit('setIsLoading', true)

            axios
                .get(`/api/v1/products/${categorySlug}/`)
                .then(response => {
                    this.category = response.data

                    document.title = this.category.name + ' | MotorMania'
                })
                .catch(error => {
                    console.log(error)

                    toast({
                        message: 'Something went wrong. Please try again.',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                })

            this.$store.commit('setIsLoading', false)




        }
    }

}
</script>