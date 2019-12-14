# Image Annotator
  
## Introdução

   Guia sobre o funcionamento e uso de um editor online para a anotação de imagens através de formas e figuras em SVG

## Sumário

- [Image Annotator](#image-annotator)
  - [Introdução](#introdu%c3%a7%c3%a3o)
  - [Sumário](#sum%c3%a1rio)
  - [Apresentação](#apresenta%c3%a7%c3%a3o)
  - [Escolhendo formas](#escolhendo-formas)
  - [Anotando](#anotando)
  - [Armazenamento das anotações](#armazenamento-das-anota%c3%a7%c3%b5es)
  - [Editando anotações](#editando-anota%c3%a7%c3%b5es)
  - [Conclusão](#conclus%c3%a3o)

## Apresentação

  Este é um editor para permitir a anotação de imagens para utilização da plataforma com fins médicos, Harena, como eletrocardiogramas e radiografias. Ele permite que sejam selecionadas áreas específicas de uma certa imagem e a ela sejam adicionadas informações referentes a essa região da imagem, através de texto livre ou, também, de ontologias, como a Mesh. Isso é feito através da seleção interativa de figuras em SVG postas por cima da imagem que se quer anotar, então, através do tamanho da figura e sua posição, é determinada a região de interesse. Faz-se isso com quantas regiões se deseja marcar, então utiliza-se um menu para registrar os dados sobre as regiões selecionadas.

## Escolhendo formas

  A plataforma consiste de uma página da web em HTML5 que contém a imagem que será anotada e alguns menus para a execução das anotações.
  Para a escolha das formas, no menu superior, existe um menu de seleção que possui algumas opções de formas pré definidas e (futuramente) a possibilidade de fazer o upload de uma forma desejada. Depois de escolhida a forma, existe um botão, criado a partir de um web component JavaScript, para criar e renderizar a figura. Ao clicar no botão a figura aparece sobre a imagem, então é possível movê-la, segurando o botão esquerdo do mouse sobre a figura. Quando se clica sobre a figura pequenos quadrados aparecem, ao arrastá-los, a figura cresce na diagonal onde este quadrado está, sem manter sua proporção, para isso deve-se redimensioná-la mantendo a tecla ctrl pressionada. Este processo pode ser repetido quantas vezes forem necessárias para marcar todas as regiões desejadas da imagem.

## Anotando

(*Futuramente*)
  
  Depois de escolhidas as regiões que se quer selecionar, pode-se fazer a anotação. No menu superior existe um botão chamado anotar. Ao clicar nele é aberto um menu de anotações lateral na parte lateral direita da página. Nesse menu existe um menu de seleção, esse menu possui, a princípio, duas opções, texto livre e vocabulário. Ao selecionar texto livre, aparece um campo de digitação onde o usuário pode digitar a informação que queira adicionar. Ao se escolher vocabulário, um novo menu de seleção aparece, ele contém palavras vindas de nossas ontologias que possam ser usadas para registrar os fatos médicos sobre a imagem e o usuário pode escolher uma delas. Logo abaixo, existe um botão adicionar, cada nova informação, seja de vocabulário ou texto livre colocada, ao apertar o botão, ela é adicionada a essa anotação. Para escolher quais regiões marcadas estão associadas a essa anotação o usuário deve clicar sobre cada região marcada, elas ficarão realçadas, para tirar a seleção basta clicar sobre a região que quer remover. Por fim, existe um botão anotar no final do menu, ao clicar nele a anotação e toda informação associada a ela serão salvos e enviados à base de dados.

## Armazenamento das anotações

(*Futuramente*)

  Quando as anotações são feitas o sistema serializa essas anotações e as salva, depois as envia para a base de dados. Para isso, ele cria uma lista de anotações, cada elemento é uma anotação criada pelo usuário. Esse objeto contém o tipo da anotação (texto livre ou vocabulário), a informação da anotação e uma lista de objetos que são as formas de cada região marcada, contendo o formato, a posição da origem da forma, sua altura e sua largura. Esse lista é transformada numa string JSON e então ela pode ser salva nos cookies do navegador ou então, enviada à base de dados do Harena.

## Editando anotações

(*Futuramente*)

  O sistema ao ser reaberto, ou mesmo durante o uso, pode carregar as anotações feitas anteriormente para editá-las ou excluí-las. Para isso, existe no menu lateral, enquanto uma nova anotação não está sendo criada, um menu de seleção que contém a lista de todas as anotações feitas pelo usuário, ao selecionar uma aparecem as informações que foram salvas sobre essa anotação, tipo, conteúdo, regiões. Tipo e conteúdo podem ser alterados ao escolher novas palavras do vocabulário, ou digitando um novo texto livre. É possível marcar novas regiões para essa anotação criando elas com o editor, como descrito anteriormente, também é possível excluir regiões clicando em cima delas, por fim, existe um botão para excluir essa anotação, apagando toda informação associada a ela  e retirando todo vínculo com qualquer região marcada.
  
## Conclusão
  
  Esta ferramente fornece uma forma visual e intuitiva para que médicos e alunos possam anotar imagens médicas ao longo da criação ou execução de casos do Harena com diversos objetivos, como o registro de partes da imagem que são definitivos para o diagnóstico, entre outros.