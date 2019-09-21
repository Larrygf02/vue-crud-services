Vue.component('lista-servicios',{
    props: ['servicios'],
    template: `<div class="services">
                    <servicio v-for="servicio in servicios" :servicio="servicio" :key="servicio.id"></servicio>
                </div>`
});

Vue.component('servicio',{
    props: ['servicio'],
    template: `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ servicio.name }}</h5>
                <p class="card-text">{{ servicio.description }}</p>
            </div>
            <div class="card-footer">
                <div style="display: flex; justify-content: space-between;">
                    <button class="btn btn-success" @click="edit">Editar</button>
                    <button class="btn btn-danger" @click="remove">Eliminar</button>
                </div>
            </div>
        </div>
    `,
    methods: {
        edit: function() {
            this.$root.servicio.id = this.servicio.id;
            this.$root.servicio.name = this.servicio.name;
            this.$root.servicio.description = this.servicio.description;
        },
        remove: function() {
            index = this.$root.servicios.findIndex(servicio => servicio.id == this.servicio.id)
            this.$root.servicios.splice(index,1)
        }
    }
});

Vue.component('form-servicio', {
    props: ['servicio'],
    template: `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Servicio</h5>
                <div v-if="has_error" class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Opps!</strong> Debes completar ambos campos.
                    <button type="button" class="close" @click="closeAlert" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form>
                    <div class="form-group">
                        <label for="name">Nombre</label>
                        <input type="text" id="name" class="form-control" v-model="servicio.name">
                    </div>
                    <div class="form-group">
                        <label for="description">Descripcion</label>
                        <input type="text" id="description" class="form-control" v-model="servicio.description">
                    </div>
                </form>
            </div>
            <div class="card-footer">
                <div style="display: flex; justify-content: space-between;">
                    <button v-if="servicio.id != ''" class="btn btn-success" @click="save">Editar</button>
                    <button v-if="servicio.id == ''" class="btn btn-success" @click="save">Grabar</button>
                    <button class="btn btn-danger" @click="clean">Cancelar</button>
                </div>
            </div>
        </div>
    `,
    methods: {
        validate: function() {
            if (this.servicio.name == '' || this.servicio.description == '') {
                return false;
            }
            return true;
        },
        save: function() {
        if (this.validate()) {
                console.log('Holis');
                if (this.servicio.id != '') {
                    index = this.$root.servicios.findIndex(servicio => servicio.id == this.servicio.id)
                    this.$root.servicios[index].name = this.servicio.name;
                    this.$root.servicios[index].description = this.servicio.description;
                }else{
                    this.$root.servicios.push({id: uuid() ,name: this.servicio.name, description: this.servicio.description})
                }
                this.clean()
            }else {
                console.log('Hay error');
                this.has_error = true;
            }
        },
        clean: function() {
            this.servicio.id = ''
            this.servicio.name = ''
            this.servicio.description = ''
            this.has_error = false
        },
        closeAlert: function() {
            this.has_error = false
        }
    },
    data: function() {
        return {
            has_error: false
        }
    }
})

new Vue({
    el: 'main',
    data: {
        servicios: [
            {
                id: 1,
                name: 'Electricidad',
                description: 'Lorem ipsum'
            },
            {
                id: 2,
                name: 'Desarrollador',
                description: 'Lorem ipsum'
            },
            {
                id: 3,
                name: 'Consultor',
                description: 'Lorem ipsum'
            },
            {
                id: 4,
                name: 'Dentista',
                description: 'Lorem ipsum'
            },
            {
                id: 5,
                name: 'Arquitecto',
                description: 'Lorem ipsum'
            }
        ],
        servicio: {
            id: "",
            name: "",
            description: ""
        }
    }
});