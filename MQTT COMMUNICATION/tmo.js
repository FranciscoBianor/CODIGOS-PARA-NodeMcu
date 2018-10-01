(function() {
	window.Main = {};
	Main.Page = (function() {
		var mosq = null; // Variavel de estado da conexão com broker
		function Page() {
			var _this = this; 
			mosq = new Mosquitto(); // função Mosquito declarado no outro arquivo que nela é declarado ws, onconnect,ondisconnect,onmessage 
	

			$('#connect-button').click(function() { //$ é um atalho para o jquer   '#connect-buttton' é a referenvcia ao id 
				return _this.connect();
			});
			$('#disconnect-button').click(function() {
				return _this.disconnect();
			});
			$('#subscribe-button').click(function() {
				return _this.subscribe();
			});
			$('#unsubscribe-button').click(function() {
				return _this.unsubscribe();
			});
			
			
			$('#liga-output').click(function() {
				var payload = "L";  // Variavel do tipo string (char)
				var TopicPublish = $('#pub-topic-text')[0].value;	//O pub-topic-text é a variavel que recebe o topico mqtt de escuta			
				mosq.publish(TopicPublish, payload, 0);// passa para o mosq as tres variaveis....pesquisar o que é publish
			});

			
			$('#desliga-output').click(function() {
				var payload = "D";  
				var TopicPublish = $('#pub-topic-text')[0].value;				
				mosq.publish(TopicPublish, payload, 0); // função publish passa (topic, payload, qos, retain) tem como objetivo transformar para exadecimalo caso a terceira variavel qos for difente de zero vai retornar 1
			});

			mosq.onconnect = function(rc){ // rc é funçao de interpretar o arquivo??????????funçaõ para escrever em um novo documento
				var p = document.createElement("p"); // cria um elemento do tipo char em um documento que vai ficar armazenado na variavel p ???????cria um documento chamado p armazenado em p
				var topic = $('#pub-subscribe-text')[0].value; // O pub-topic-text é a variavel que recebe o topico mqtt de escrita  ..... $('#pub-subscribe-text') vai receber o valor 0
				p.innerHTML = "Conectado ao Broker!";//escreve na pagina usando o elemento p
				$("#debug").append(p);
				mosq.subscribe(topic, 0);
				
			};
			mosq.ondisconnect = function(rc){// rc é funçao de interpretar o arquivo??????????funçaõ para escrever em um novo documento
				var p = document.createElement("p");// cria um elemento do tipo char em um documento que vai ficar armazenado na variavel p
				var url = "ws://iot.eclipse.org/ws";//url do broker MQTT
				
				p.innerHTML = "A conexão com o broker foi perdida"; //escreve na pagina (usando o elemento p
				$("#debug").append(p);				
				mosq.connect(url); // manda escrever em mosq a url do broker MQTT
			};
			mosq.onmessage = function(topic, payload, qos){ // função que 
				var p = document.createElement("p");
				var acao = payload[0];//como a variavel payload so aprenta um caracter o vetor dela vai ser de um caracter ou seja 0 vai ser do tipo byte
				
				//escreve o estado do output conforme informação recebida
				if (acao == 'L')
					p.innerHTML = "<center><img src='ligado.png'></center>"
				else
					p.innerHTML = "<center><img src='desligado.png'></center>"
				
				$("#status_io").html(p); //escreve (coloca) tudo que esta sendo ecrito no arquivo p do tipo html (p.innerHTML) na div $("#status_io")
			};
		}
		Page.prototype.connect = function(){
			var url = "ws://iot.eclipse.org/ws";
			mosq.connect(url);
		};
		Page.prototype.disconnect = function(){
			mosq.disconnect();
		};
		Page.prototype.subscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.subscribe(topic, 0);
		};
		Page.prototype.unsubscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.unsubscribe(topic);
		};
		
		return Page;
	})();
	$(function(){
		return Main.controller = new Main.Page; // retorna uma nova pagina
	});
}).call(this);

/*função connect , diconnect , subscribe e unsubscibe são funções declaradas nos 
outros arquivos 
*/