<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Altera Transação</h3>
            <form @submit.prevent="onUpdateForm">
              <div class="form-group">
                    <label>Data</label>
                    <input type="date" class="form-control" v-model="transaction.data" required>
                </div>
                <div class="form-group">
                    <label>Descrição</label>
                    <input type="text" class="form-control" v-model="transaction.name" required>
                </div>

                                <div class="form-group">
                    <label>Descrição</label>
                    <input type="text" class="form-control" v-model="transaction.name" required>
                    
                    <label>Tipo</label>
                    <select v-model="transaction.tipo" id="tipo">
                        <option value="Receita">Receita</option>
                        <option value="Despesa">Despesa</option>
                    </select>
                    <label>Categoria</label>
                    <select v-model="transaction.categoria" id="categoria">
                        <option value="Carisia Receita">Carisia Receita </option>
                        <option value="Flavio Receita">Flavio Receita </option>
                        <option value="Casa Despesa">Casa Despesa</option>
                        <option value="Carisia Despesa">Carisia Despesa</option>
                        <option value="Flavio Despesa">Flavio Despesa</option>
                        <option value="Ativa Despesa">Ativa Despesa</option>
                    </select>


                     <label>Banco</label>
                    <select v-model="transaction.banco" id="banco">
                        <option value="BB">BB</option>
                        <option value="Caixa">Caixa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="Visa">Visa</option>
                        <option value="Dinheiro">Dinheiro</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Valor</label>
                    <input type="number" class="form-control" v-model="transaction.valor"
                     required pattern="[0-9]+([,\.][0-9]+)?" min="0" step="any" name="null">
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Altera Transação</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { db } from '../firebaseDb';

    export default {
        data() {
            return {
                transaction: {
                }
            }
        },
        created() {
            let dbRef = db.collection('transactions').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.transaction = doc.data();
                if(this.transaction.tipo=="Despesa"){this.transaction.valor=-this.transaction.valor}
            }).catch((error) => {
                console.log(error)
            })
             
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                if(this.transaction.tipo=="Despesa"){this.transaction.valor=-this.transaction.valor}
                db.collection('transactions').doc(this.$route.params.id)
                .update(this.transaction).then(() => {
                    //console.log("Transação alterada!");
                    this.$router.push('/')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>