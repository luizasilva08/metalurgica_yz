import os
import requests
from flask import Flask, render_template, request, redirect, session, url_for
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY")

# Pegamos as credenciais que você já achou no painel do Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Criamos um "cabeçalho" padrão que avisa ao Supabase quem nós somos em cada requisição
HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json"
}

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Pegamos a matrícula que veio do HTML
        cadastro = request.form['cadastro']
        senha = request.form['senha']
        
        # O TRUQUE: Transformamos a matrícula em um e-mail falso para o Supabase
        email_falso = f"{cadastro}@yz.com"
        
        # O resto do código continua igual, mas enviamos o email_falso!
        url_auth = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"
        dados_login = {"email": email_falso, "password": senha}
            
            if resposta_perfil.status_code == 200 and len(resposta_perfil.json()) > 0:
                cargo = resposta_perfil.json()[0]['cargo']
                
                # Salva os dados na sessão do Flask
                session['user_id'] = user_id
                session['cargo'] = cargo
                
                # Redirecionamento RBAC conforme o cargo
                if cargo == 'chefia':
                    return redirect(url_for('dashboard_chefia'))
                elif cargo == 'operador':
                    return redirect(url_for('portal_operador'))
            else:
                return "Perfil ou cargo não encontrado no banco de dados."
        else:
            return "Erro: E-mail ou senha incorretos."
            
    return render_template('login.html')

@app.route('/chefia')
def dashboard_chefia():
    if session.get('cargo') != 'chefia':
        return "Acesso negado", 403
    return render_template('chefia.html')

@app.route('/operador')
def portal_operador():
    if session.get('cargo') != 'operador':
        return "Acesso negado", 403
    return render_template('operador.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

if __name__ == '__main__':
    # O Render exige que o host seja '0.0.0.0' para conectar com a internet pública
    app.run(host='0.0.0.0', port=5000, debug=True)
