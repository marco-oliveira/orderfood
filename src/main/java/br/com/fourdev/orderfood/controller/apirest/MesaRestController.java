
package br.com.fourdev.orderfood.controller.apirest;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import br.com.fourdev.orderfood.model.Mesa;
import br.com.fourdev.orderfood.model.Produto;
import br.com.fourdev.orderfood.service.MesaService;
import br.com.fourdev.orderfood.service.ProdutoService;

//@ImportResource("classpath:org/springframework/integration/samples/chat/stomp/server/stomp-server.xml")
@RestController
@RequestMapping("/mesa")
public class MesaRestController {

	final static Logger logger = LoggerFactory.getLogger(MesaRestController.class);
	@Autowired
	private MesaService mesaService;
	
	@Autowired
	private ProdutoService produtoService;
	

	// private SimpMessagingTemplate template;

	@RequestMapping(value = "/listarMesas", method = RequestMethod.GET)
	public List<Mesa> selectMesaList() {
		return mesaService.selectMesaList();
	}

	@RequestMapping(value = "/buscarMesaPorCodigo/{id}", method = RequestMethod.GET)
	public Mesa selectMesaById(@PathVariable("id") int id) {
		return mesaService.selectMesaById(id);
	}

	@RequestMapping(value = "/savarMesa", method = RequestMethod.POST)
	public void insertMesa(@RequestBody Mesa mesa) {

		logger.debug("id=" + mesa.getIdmesa());
		logger.debug("Name=" + mesa.getDescricao());
		logger.debug("age=" + mesa.getDescricao());

		mesaService.insertMesa(mesa);
	}

	@RequestMapping(value = "/atualizarMesa/{id}", method = RequestMethod.PUT)
	public void updateMesa(@RequestBody Mesa mesa, @PathVariable("id") int id) {
		logger.debug("id=" + id);
		mesaService.updateMesa(id, mesa);
	}

	@RequestMapping(value = "/deletarMesa/{id}", method = RequestMethod.DELETE)
	public void deleteMesa(@PathVariable("id") int id) {
		mesaService.deleteMesa(id);
	}

	@RequestMapping(value = "/verificarmesa/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public String  verificarStatusMesa(@PathVariable("id") int idmesa) throws Exception {
		// código que faz o trabalho ;-)
		Gson gson = new Gson();
		String valor = "";
		if (mesaService.verificarStatusMesa(idmesa)) {
//			valor += "Mesa disponivel";
			List<Produto> produtos = new ArrayList<Produto>();
			produtos = produtoService.selectProdutoList();
			valor += gson.toJson(produtos);
		} else {
			valor += gson.toJson("Mesa ocupada");
		}
//		String userJSONString = gson.toJson(valor);
//
//		valor = userJSONString;//gson.fromJson(userJSONString, String.class);
		return valor;

	}
}