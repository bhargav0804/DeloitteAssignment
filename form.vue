<template>
  <div>
    <b-form @submit.prevent="$emit('on-submit', form)">
      <b-form-group
        id="input-group-1"
        label="ProductID:"
        label-for="input-1"
        description="Enter ProductID"
        v-if="!edit"
      >
        <b-form-input
          id="input-1"
          v-model="form.ProductID"
          type="text"
          placeholder="Enter ProductID"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="ProductName:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.ProductName"
          placeholder="Enter ProductName"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="SupplierID:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.SupplierID"
          placeholder="Enter SupplierID"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="CategoryID:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.CategoryID"
          placeholder="Enter CategoryID"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-5"
        label="QuantityPerUnit:"
        label-for="input-5"
      >
        <b-form-select
          id="input-5"
          v-model="form.QuantityPerUnit"
          :options="QuantityPerUnit"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-6" label="UnitPrice:" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="form.UnitPrice"
          placeholder="Enter UnitPrice"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-7"
        label="UnitsInStock:"
        label-for="input-7"
      >
        <b-form-input
          id="input-7"
          v-model="form.UnitsInStock"
          placeholder="Enter UnitsInStock"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-8"
        label="UnitsOnOrder:"
        label-for="input-8"
      >
        <b-form-input
          id="input-8"
          v-model="form.UnitsOnOrder"
          placeholder="Enter UnitsOnOrder"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-8"
        label="ReorderLevel:"
        label-for="input-8"
      >
        <b-form-input
          id="input-8"
          v-model="form.ReorderLevel"
          placeholder="Enter ReorderLevel"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-9"
        label="Discontinued:"
        label-for="input-9"
      >
        <b-form-checkbox
          id="input-9"
          name="input-9"
          v-model="form.Discontinued"
          unchecked-value="false"
        >
          Discontinued
        </b-form-checkbox>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button
        type="submit"
        class="md-5 ml-3"
        variant="outline-primary"
        @click="gotTo()"
      >
        Cancel
      </b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  props: {
    productDetails: {
      type: Object,
    },
    edit: {
      type: Boolean,
    },
  },
  mounted() {
    console.log(this.productDetails);
  },
  methods: {
    gotTo() {
      this.$router.push(`/`);
    },
  },
  data() {
  
    return {
      form: {
        ProductID: this.$route.params.param,
        ProductName: this.productDetails?.ProductName || "",
        SupplierID: this.productDetails?.SupplierID || "",
        CategoryID: this.productDetails?.CategoryID || "",
        QuantityPerUnit:
          this.productDetails?.QuantityPerUnit || "24 - 1 oz bottles",
        UnitPrice: this.productDetails?.UnitPrice || "",
        UnitsInStock: this.productDetails?.UnitsInStock || "",
        UnitsOnOrder: this.productDetails?.UnitsOnOrder || "",
        ReorderLevel: this.productDetails?.ReorderLevel || "",
        Discontinued: this.productDetails?.Discontinued || false,
      },
      QuantityPerUnit: [
        "24 - 1 oz bottles",
        "24 - 2 oz bottles",
        "24 - 3 oz bottles",
        "24 - 4 oz bottles",
        "24 - 5 oz bottles",
      ],
    };
  },
};
</script>