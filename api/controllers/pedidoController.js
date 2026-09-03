const { sequelize } = require("../config/database.js");
const { Pedido } = require("../models/pedidoModel.js");

const mostrarPedidos = async (req, res) =>{

    try{
        const PedidosEncontrados = await Pedido.findAll();
        if(!PedidosEncontrados) {
            return res.status(404).json({message: "No se encontraron pedidos aún.."})
        }

        res.status(200).json({ message: "Lista de pedidos: ", pedidos: PedidosEncontrados })
    }catch(error){
        res.status(500).json({ error: error.message})
    }

}

const pedidosPorId = async (req, res) =>{
    try{
        const id = Number(req.params.id);
        const pedido = await Pedido.findByPk(id);

        if(!pedido) {
            return res.status(404).json({message: "No se encontro el pedido solicitado"})
        }

        res.status(200).json({ message: "Pedido encontrado: ", pedido: pedido })
    }catch(error){
        res.status(500).json({ error: error.message})
    }
}

const realizarPedido = async (req, res) =>{
    try{

        const { factura, fecha } = req.body;
        const nuevoPedido = await Pedido.create({ factura, fecha });

        if(!factura || !fecha) {
            return res.status(400).json({ message: "Faltan parametros" })
        }

        res.status(201).json({ message: "Pedido realizado exitosamente", pedido: nuevoPedido })

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = { mostrarPedidos, pedidosPorId, realizarPedido }