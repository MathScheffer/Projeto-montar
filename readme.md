<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <h1>Projeto Base - RELEASE</h1>
    <img src="https://img.shields.io/badge/Vers%C3%A3o-Release-blue">
    <p alin="justify">
        A versão RELEASE como objetivo facilitar a manutenção e adição de métodos do nosso Projeto Base, tornando-o mais acessível e democrático para membros de outras equipes da Getnet.
    </p>
    <h2>O que muda nesta versão? </h2>
    <ul>
        <li>Melhora na Arquitetura
            <ul>
                <li>Maior facilidade na leitura e entendimento do projeto</li>
                <li>Facilidade de adição de novos métodos</li>
            </ul>
        </li>
        <li>Adição de novos métodos
            <ul>
                <li>Manipulação de Arquivos dentro da nossa Pasta de Rede som SMBFiles</li>
            </ul>
            <ul>
                <li>Banco de Dados
                    <ul>
                        <li>Conexão com a PNR HTI</li>
                        <li>Abstração dos trechos repetitivos das queries para uma função genérica (QueriesBanco.realizarConsulta(String nomeBase, String query))</li>
                        <li>Novos métodos de consulta para a base de dados do Gerencial</li>
                    </ul>
                </li>
                <li>Manipulações de Arquivos
                    <ul>
                        <li>Camada(Sftp) de métodos que autentica e realiza operações com arquivos na nossa pasta de Rede</li>
                        <li>Manipulação de arquivos (Gzip, Pdf e Txt)</li>
                    </ul>
                </li>
                <li>Métodos de Api
                    <ul>
                        <li>Métodos genéricos de get, post, put e delete</li>
                        <li>Métodos para extração de Cookies e Responses</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
    <h2>Estrutura atual do Projeto </h2>
    <pre>
    └───main
    └───java
    └───br
    └───com
    └───getnet
    └───homologacao
    ├───criptografia
    ├───lifecycle
    │   ├───aplicacoes
    │   ├───interfaces
    │   └───reports
    │       ├───evidence
    │       ├───logs
    │       └───testLog
    ├───pages
    │   ├───api
    │   ├───appium
    │   ├───selenium
    │   └───sikuli
    ├───sftp
    ├───steps
    └───util
    ├───Arquivos
    ├───BancoDeDados
    ├───Integracao
    └───modeloFeature
    </pre>
    <div style="padding-left:15px">
        <h3 >criptografia</h3>
        <p ><small>(Ainda em desenvolvimento)</small></p>
    </div>
    <p>A camada de criptografia criada encontra-se com a classe AESEncryptor, que utiliza o algoritmo AES para os métodos de criptografia.</p>
    <div style="padding-left:15px">
        <h3 >lifecycle</h3>
    </div>
    <p>Na camada Lifecycle, encontramos os métodos responsáveis por gerenciar o ciclo de vida do nosso teste controlado pelas classes TestRules.Além destas, possuímos as seguintes subcamadas:</p> 
    <h4 style="padding-left:30px">Aplicacoes</h4>
    <p>Contém as interfaces responsáveis por armazenar os métodos de cada técnologia. Dentre eles, temos, por exemplo:</p>
    <ul>
        <li>Inicializar e armazenar o Driver da aplicação</li>
        <li>Configurar caminho padrão para download</li>
        <li>Maximar a janela do browser (por exemplo, no caso de aplicações que utilizam o chrome ou IE)</li>
    </ul>
    <h4 style="padding-left:30px">Interfaces</h4>
    <p>Camada responsável por gerenciar a estrutura de diretórios do relatório e métodos básicos para a construção do mesmo, executando as tarefas de: </p>
    <ul>
        <li>Iniciar o ExtentReport</li>
        <li>Armazenar e printar os steps das evidências</li>
        <li>Limpar o diretório de imagens</li>
    </ul>
    <h4 style="padding-left:30px">Reports</h4>
    <p>Um pouco mais complexa que as anteriores por ser uma biblioteca robusta, a camada Reports possui as seguintes responsabilidade:</p>
    <ul>
        <li>Evidence
            <ul>
                <li>Gerenciar a criação do relatório</li>
            </ul>
        </li>
        <li>Logs
            <ul>
                <li>Armazenar as interfaces dos métodos de Logs</li>
                <li>Armazenar métodos para print de tela</li>
            </ul>
        </li>
        <li>TestLog
            <ul>
                <li>Escreve, atualiza e salva o arquivo de Log</li>
            </ul>    
        </li>
    </ul>
    <>
    <h3>Pages</h3>
    <p>Possuímos, aqui, as técnologias que utilizamos em java para a escrita dos nossos Testes Automatizados. Como dito anteriormente, o projeto suporta as técnologias sikuli, selenium e appium (além de RestAssured, localizado na camada api).</p>
    <p>Para exemplicar a estrutura de cada page, tomaremos a page <bold>Selenium</bold> como base:</p>
    </br>
    <p><strong>BasePageSelenium</strong>: Estende as interfaces ElementInteraction, Log e Utils. Além disso, é a própria classe que é estendida nas classes do projeto do programador.</p>
    <p><strong>ElementInteraction</strong>: Classe responsável por <ins>encapsular</ins> os métodos básicos da tecnologia e outros criados para interagir com os WebElements.</p>
    <p><strong>Log</strong>: Contém o refinamento dos métodos das classes de Logs da camada de Lifecycle. Por exemplo, logs com highlight no WeblElement desejado.</p>
    <p><strong>Utils</strong>: Métodos que não possuem uma categoria específica.</p>
    <h3>Sftp</h3>
    <p>Camada que possibilita a criação e interação com arquivos dentro da rede. Destacamos, aqui, os métoods <strong>retornaLinhasArquivo</strong> e <strong>obterDadosDeSaidaDoCenario</strong> para manipulação de arquivos CSV's de massa.</p>
    <p>Veja como os principais métodos desta camada se comportam em <span><a src="https://bitbucket.getnet.com.br/projects/HOM/repos/projeto-template-automacao-maven/browse">projeto-template-automacao-maven</a></span>.</p>
    <h3>steps</h3>
    <p>Todos os projetos que fazem uso do Gherkin e seguem os padrões da automação possuem uma camada "steps" como "ponte" entre o <strong>Cucumber</strong> e os métodos das <strong>Pages</strong>. Desta forma, para poupar código repetido em diferentes projetos, 
    uma camada Steps fora criada no Projeto-Base com "passos" que interagem diretamente no ciclo de vida do teste. Abaixo, os principais métodos divididos em tópicos.</p>
    <h4>Inicializar o Cenário</h4>
    <p style="background: #2b2b2b; color: #a9b7c6; display:inline;  padding: 5px 10px"><span style="color:#ca7631">Dado</span> que o cenario "<span style="color:#296fdd">Nome do cenario de dependencia</span>" foi executado com sucesso</p>: <p style="display: inline">Verifica se o cenário passado nas <strong>Strings</strong> foi executado anteriormente,
    tornando-o como pré-condição.</p>
    <h4>Manipulação de Arquivos de Massa </h4>
    <p style="background: #2b2b2b; color: #a9b7c6; display:inline;  padding: 5px 10px"><span style="color:#ca7631">E</span> a execucao do cenario ocorreu a <span style="color:#296fdd">7</span> dias atras</p>: <p style="display: inline">Verifica se o cenário dependente foi executado em <span style="color:#296fdd">X</span> dias, neste caso, 7. </p>
    <p style="margin-top: 8px"><strong>CUIDADO</strong>: O parâmetro de <span style="color:#296fdd">X</span> dias não fica entre <strong>aspas</strong>, sendo então, um número!</p>
    <p style="background: #2b2b2b; color: #a9b7c6; display:inline;  padding: 5px 10px"><span style="color:#ca7631">E</span> a execucao do cenario ocorreu de <span style="color:#296fdd">1</span>  a <span style="color:#296fdd">7</span> dias atras</p>: <p style="display: inline">Verifica se o cenário dependente foi executado em um intervalo de dias, neste caso, de 1 a 7 dias.</p>
    <Br>
    <div style="background: #2b2b2b; color: #a9b7c6; display:inline-block; margin: 16px 0; padding: 0 10px"> 
        <img src="images-for-readme/step3.png">: Pega a massa obtida por um step que salve os dados (step de filtro por dias, por exemplo) e salva, no TestRule, as variáveis exatamente como passadas na datable do step. Neste caso, <strong style="color:#296fdd">CPF</strong> e <strong style="color:#296fdd">EC</strong>
    </div>
    <p><strong>Observações:</strong></p>
    <ol>
        <li>Como o step salva na variável integradorCenarios, obtemos os dados com a função obterChaveValor() da classe Root, passando o nome da coluna inserido no step. Neste caso, poderia ser <span style="color:#296fdd">CPF</span> ou <span style="color:#296fdd">EC</span>;</li>
        <li>Este step só aceita <strong>dois</strong> parâmetros: <span style="color:#296fdd">antigo</span> e <span style="color:#296fdd">recente</span>;</li>
        <li>Uma vez que o step foi feito para aceitar parâmetros específicos, estes <strong>não deverão ficar entre aspas</strong>.</li>
    </ol>  
</body>
</html>
