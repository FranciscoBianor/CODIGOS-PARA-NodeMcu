//Include da biblioteca das placas Esp
#include <ESP8266WiFi.h>  

//Include da lib do sensor DHT11 e DHT22
#include "DHT.h"

//Define do pino a ser utilizado no ESP para o sensor = D7
#define DHT_DATA_PIN 13
#define DHTTYPE DHT11

 

 

 
void setup() {
  //Configuração da UART/USB para escita e leitura de dados no monitor
  Serial.begin(9600);
  dht.begin();
 
 
}
 
void loop() {
 

  //Leitura de umidade
  float umidade = dht.readHumidity();
  //Leitura de temperatura
  float temperatura = dht.readTemperature();
   //Se não for um numero retorna erro de leitura
  if (isnan(umidade) || isnan(temperatura)) {
    Serial.println("Erro ao ler o sensor!");
    return;
  }
 

 

     Serial.print("Temperatura: ");
     Serial.print(temperatura);
     Serial.print(" Umidade: ");
     Serial.println(umidade);
     
  }
  
