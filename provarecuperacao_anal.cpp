#include <iostream>
#include <conio.h>
using namespace std;

main()

{
int i = 1;
int maior, menor, qtd, soma = 0, numerodousuario;
float media;

cout<<"Quantidade de numeros a ser fornecida: ";
cin>>qtd;
while(qtd <= 0)
{
    cout<<"Numero invalido, insira um valor positivo: ";
    cin>> qtd;
}

while(i <= qtd)
{
cout<<"forneca o numero: ";
cin>>numerodousuario;
if(i == 1)
{
    maior = numerodousuario;
    menor = numerodousuario;
}
if(numerodousuario > maior)
    maior = numerodousuario;
else
    if(numerodousuario < menor)
    menor = numerodousuario;
soma = soma + numerodousuario;
i++;
}

media = soma;
media = media/qtd;

cout<<"A media e: "<< media <<"."<<endl;
cout<<"O maior numero e " << maior <<" e o menor numero e : " << menor << ".";

}
