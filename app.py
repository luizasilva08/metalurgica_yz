import os
import requests
from flask import Flask, render_template, request, redirect, session, url_for
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY")

# Credenciais do Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Cabeçalho padrão para as requisições à API do Supabase
HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json"
}

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        matricula = request.form['matricula']
        senha = request.form['senha']
        
        # O TRUQUE: Transformamos a matrícula num e-mail falso para o Supabase
        email_falso = f"{matricula}@yz.com"
        
        # 1. Faz o Login usando a API do Supabase
        url_auth = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"
        dados_login = {"email": email_falso, "password": senha}
        
        resposta_auth = requests.post(url_auth, json=dados_login, headers=HEADERS)
        
        if resposta_auth.status_code == 200:
            dados_usuario = resposta_auth.json()
            user_id = dados_usuario['user']['id']
            
            # 2. Busca o cargo do utilizador (RBAC) na tabela 'perfis' via API REST
            url_perfil = f"{SUPABASE_URL}/rest/v1/perfis?id=eq.{user_id}&select=cargo"
            resposta_perfil = requests.get(url_perfil, headers=HEADERS)
            
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
                return "Erro: Perfil ou cargo não encontrado na base de dados."
        else:
            return "Erro: Matrícula ou palavra-passe incorretos."
            
    return render_template('login.html')

@app.route('/chefia')
def dashboard_chefia():
    if session.get('cargo') != 'chefia':
        return "Acesso negado. Área restrita à Chefia.", 403
    return render_template('chefia.html')

@app.route('/operador')
def portal_operador():
    if session.get('cargo') != 'operador':
        return "Acesso negado. Área restrita a Operadores.", 403
    return render_template('operador.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

if __name__ == '__main__':
    # O host 0.0.0.0 é exigido pelo Render para funcionar na web
    app.run(host='0.0.0.0', port=5000, debug=True)
