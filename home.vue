<template>
  <div class="home container-fluid mt-6">
    <b-row class="justify-content-around mt-6 font-size">
      <b-col cols="12" class="mt-3">
        <b-row>
          <b-col>
            <b-form-group
              label="Product ID:"
              label-for="productid"
              class="search-form-group"
            >
              <b-form-input
                id="productid"
                placeholder="Product ID"
                v-model="formData.ProductID"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Product Name:"
              label-for="productname"
              class="search-form-group"
            >
              <b-form-input
                id="productname"
                placeholder="Product Name"
                v-model="formData.ProductName"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Supplier:"
              label-for="suppliername"
              class="search-form-group"
              ><b-form-select
                v-model="formData.SupplierID"
                id="suppliername"
                :options="supplieroptions"
                value-field="Id"
                text-field="Name"
                ><template #first>
                  <b-form-select-option :value="null" disabled
                    >-- Please select an option --</b-form-select-option
                  >
                </template>
              </b-form-select></b-form-group
            >
          </b-col>
          <b-col>
            <b-form-group
              label="Category:"
              label-for="categoryname"
              class="search-form-group"
              ><b-form-select
                v-model="formData.CategoryID"
                id="categoryname"
                :options="categoryoptions"
                value-field="Id"
                text-field="Name"
                ><template #first>
                  <b-form-select-option :value="null" disabled
                    >-- Please select an option --</b-form-select-option
                  >
                </template></b-form-select
              ></b-form-group
            >
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col>
            <b-form-group
              label="Quantity Per Unit:"
              label-for="qtyperunit"
              class="search-form-group"
            >
              <b-form-input
                id="qtyperunit"
                v-model="formData.QuantityPerUnit"
                placeholder="Quantity Per Unit"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Unit Price:"
              label-for="unitprice"
              class="search-form-group"
            >
              <b-form-input
                id="unitprice"
                v-model="formData.UnitPrice"
                placeholder="Unit Price"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Units In Stock:"
              label-for="unitsinstock"
              class="search-form-group"
            >
              <b-form-input
                id="unitsinstock"
                v-model="formData.UnitsInStock"
                placeholder="Units in Stock"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Units On Order:"
              label-for="unitsonorder"
              class="search-form-group"
            >
              <b-form-input
                id="unitsonorder"
                placeholder="Units On Order"
                v-model="formData.UnitsOnOrder"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col>
            <b-form-group
              label="Reorder Level:"
              label-for="reorderlevel"
              class="search-form-group"
            >
              <b-form-input
                id="reorderlevel"
                placeholder="Reorder Level"
                v-model="formData.ReorderLevel"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Discontinued:"
              label-for="discontinued"
              class="search-form-group"
              ><b-form-checkbox
                v-model="formData.Discontinued"
              ></b-form-checkbox>
            </b-form-group>
          </b-col>
          <b-col>
            <b-button id="btnSearch" @click="searchProducts()">Search</b-button>
          </b-col>
          <b-col cols="1" class="form-group ml-4">
            <b-button
              type="button"
              variant="outline-primary"
              @click="clearAll()"
            >
            Clear
            </b-button>
          </b-col>
          <b-col cols="3" class="form-group ml-4">
            <b-button
              type="button"
              variant="outline-primary"
              @click="goToAddProduct()"
            >
              Add Product
            </b-button>
          </b-col>
        </b-row>
      
      </b-col>
    </b-row>
    <b-table
      :items="productList"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      stacked="md"
      show-empty
      small
    >
      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="goToUpdateProduct(row.item.productID)"
          class="mr-1"
        >
          Edit
        </b-button>
        <b-button size="sm" @click="deleteProduct(row.item.productID)">
          Delete
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </b-card>
      </template>
    </b-table>
    <b-row class="justify-content-around">
      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
    <div
      v-if="!productList.length && !loading"
      class="mt-5 col-12 row justify-content-center"
    >
      No Records available!
    </div>
    <div v-if="loading" class="mt-5 col-12 row justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import suppliers from "../assets/suppliers.json";
import categories from "../assets/categories.json"; 
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      title: "Home",
      keywords: "",
      loading: false,
      errored: false,
      productList: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      formData: {
        ProductID: "",
        ProductName: "",
        SupplierID: null,
        CategoryID: null,
        QuantityPerUnit: "",
        UnitPrice: "",
        UnitsInStock: "",
        UnitsOnOrder: "",
        ReorderLevel: "",
        Discontinued: false,
      },
      supplieroptions: [],
      categoryoptions: [],
      searchInput: "",
      fields: [
        {
          key: "productID",
          label: "ProductID",
          sortDirection: "desc",
          class: "text-center",
        },
        {
          key: "productName",
          label: "ProductName",
          class: "text-center",
        },
        {
          key: "supplierID",
          label: "SupplierID",
          class: "text-center",
        },
        {
          key: "categoryID",
          label: "CategoryID",
          class: "text-center",
        },
        {
          key: "quantityPerUnit",
          label: "QuantityPerUnit",
          class: "text-center",
        },
        {
          key: "unitPrice",
          label: "UnitPrice",
          class: "text-center",
        },
        {
          key: "unitsInStock",
          label: "UnitsInStock",
          class: "text-center",
        },
        {
          key: "unitsOnOrder",
          label: "UnitsOnOrder",
          class: "text-center",
        },
        {
          key: "reorderLevel",
          label: "ReorderLevel",
          class: "text-center",
        },
        {
          key: "discontinued",
          label: "Discontinued",
          class: "text-center",
        },
        { key: "actions", label: "Actions" },
      ],
    };
  },
  methods: {
    goToAddProduct() {
      this.$router.push("/product");
    },
    goToUpdateProduct(value) {
      this.$router.push(`/product/${value}`);
    },
    clearAll: function () {
      this.formData.ProductID = "";
      this.formData.ProductName = "";
      this.formData.SupplierID = null;
      this.formData.CategoryID = null;
      this.formData.QuantityPerUnit = "";
      this.formData.UnitPrice = "";
      this.formData.UnitsInStock = "";
      this.formData.UnitsOnOrder = "";
      this.formData.ReorderLevel = "";
      this.formData.Discontinued = false;
      this.getProducts();
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    filterProducts() {
    console.log("I want to filter items here");
    },
    searchProducts() {
      console.log("search products", this.formData.SupplierID);
      console.log("search Form submitted with data:", this.formData);
      axios
        .post("https://localhost:44375/api/product/searchresult", this.formData)
        .then((response) => {
          console.log(response);
          const getSupplierName = (id) => suppliers.filter(supplier => supplier.Id === id)[0];
          const getCategoryName = (id) => categories.filter(category => category.Id === id)[0];

       const updateRows = response.data.response.map(data => {
       return {
        ...data,
        supplierID: getSupplierName ? JSON.parse(JSON.stringify(getSupplierName(data.supplierID))).Name : data.supplierID,
        categoryID: getCategoryName ? JSON.parse(JSON.stringify(getCategoryName(data.categoryID))).Name : data.categoryID,
       }
       }
       );
       
          this.productList = updateRows;
          this.totalRows = this.productList.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteProduct: function (productId) {
      this.loading = true;
      this.$nextTick(() => {
        axios
          .delete(`https://localhost:44375/api/product/${productId}`)
          .then((response) => {
            console.log(response);
            this.loading = false;
            this.productList = this.productList.filter((product) => {
              return product.ProductID !== productId;
            });
            alert();
            this.totalRows = this.productList.length;
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false));
      });
    },
    getProducts: function () {
      this.loading = true;
      this.productList = [];
      this.$nextTick(() => {
        axios
          .get("https://localhost:44375/api/product")
          .then((response) => {
            this.loading = false;
            this.productList = response.data.response;
            console.log(response.data.response);
            this.totalRows = this.productList.length;
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false));
      });
    },
  },
  mounted() {
    this.supplieroptions = suppliers;
    this.categoryoptions = categories;
    this.getProducts();
    this.totalRows = this.productList.length;
  },
};
</script>

<style  scoped>
.searchForm {
  color: #555;
  display: flex;
  border: 1px solid currentColor;
  border-radius: 5px;
  margin-left: 20px;
}

input[type="search"] {
  border: none;
  background: transparent;
  margin: 0;
  padding: 7px 8px;
  font-size: 14px;
  color: inherit;
  border: 1px solid transparent;
  border-radius: inherit;
}
.submitButton {
  text-indent: -999px;
  overflow: hidden;
  width: 40px;
  padding: 0;
  margin: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat center;
  cursor: pointer;
  opacity: 0.7;
}
.font-size {
  font-size: 0.85rem !important;
}
.dropdown {
  position: relative;
  display: block;
  margin: auto;
}
.dropdown-input {
  background: #fff;
  cursor: pointer;
  border: 1px solid #e7ecf5;
  border-radius: 3px;
  color: #333;
  display: block;
  font-size: 0.8em;
  padding: 6px;
  min-width: 250px;
  max-width: 250px;
}
.dropdown-input:hover {
  background: #f8f8fa;
}
.dropdown-content {
  position: absolute;
  background-color: #fff;
  min-width: 248px;
  max-width: 248px;
  max-height: 248px;
  border: 1px solid #e7ecf5;
  box-shadow: 0px -8px 34px 0px rgba(0, 0, 0, 0.05);
  overflow: auto;
  z-index: 1;
}
.dropdown-item {
  color: black;
  font-size: 0.7em;
  line-height: 1em;
  padding: 8px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #e7ecf5;
}

.dropdown:hover .dropdowncontent {
  display: block;
}
.txt:hover {
  text-decoration: underline;
  cursor: pointer;
}
table {
  word-break: break-word;
}
table thead th {
background-color: #ffffe0;
}
.search-form-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: left;
  margin-left: 20px;
}
</style>
