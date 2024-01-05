<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="12" v-if="!isEdit" class="mt-5">
          <ProductForm :edit="false" @on-submit="createProduct" />
        </b-col>
        <b-col cols="12" v-if="isEdit && productDetails" class="mt-5">
          <ProductForm
            :productDetails="productDetails"
            :edit="true"
            @on-submit="updateProduct"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ProductForm from "./form.vue";
import axios from "axios";
export default {
  name: "Details",
  components: { ProductForm },
  data() {
    return {
      productDetails: undefined,
      isEdit: !!this.$route.params.param,
    };
  },
  methods: {
    gotTo() {
      this.$router.push(`/`);
    },
    parseObject(obj) {
      return {
        ProductID: Number(obj.ProductID),
        productName: obj.ProductName,
        supplierID: Number(obj.SupplierID),
        categoryID: Number(obj.CategoryID),
        quantityPerUnit: obj.QuantityPerUnit,
        unitPrice: Number(obj.UnitPrice),
        unitsInStock: Number(obj.UnitsInStock),
        unitsOnOrder: Number(obj.UnitsOnOrder),
        reorderLevel: Number(obj.ReorderLevel),
        discontinued: Boolean(obj.Discontinued),
      };
    },
    createProduct(ProductForm) {
      console.log("creating", ProductForm);
      axios
        .post(
          `https://localhost:44375/api/product/`,
          this.parseObject(ProductForm)
        )
        .then((response) => {
          this.loading = false;
          console.log(response);
          this.gotTo();
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    updateProduct(ProductForm) {
      console.log("updating", this.parseObject(ProductForm));
      axios
        .put(
          `https://localhost:44375/api/product/${ProductForm.ProductID}`,
          this.parseObject(ProductForm)
        )
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.gotTo();
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    getProductDetails() {
      axios
        .get(
          `https://localhost:44375/api/product/${Number(
            this.$route.params.param
          )}`
        )
        .then((response) => {
          this.loading = false;
          console.log(response);
          this.productDetails = response.data.response;
          console.log(this.productDetails, this.isEdit);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.loading = true;
    if (this.$route.params.param) {
      this.getProductDetails();
    }
  },
};
</script>

<style>
table {
  word-break: break-word;
}
</style>