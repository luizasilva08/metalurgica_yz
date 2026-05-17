import os
from flask import Flask, render_template, request, redirect, session, url_for
from supabase import create_client, Client
from dotenv import load_dotenv

# Carrega as variáveis do arquivo .env
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY")

# Conexão com o Supabase
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']
        
        try:
            # Faz o login no Supabase
            response = supabase.auth.sign_in_with_password({"email": email, "password": senha})
            user_id = response.user.id
            
            # Busca o cargo do usuário (RBAC) na tabela 'perfis'
            perfil = supabase.table('perfis').select('cargo').eq('id', user_id).execute()
            cargo = perfil.data[0]['cargo']
            
            # Salva na sessão do Flask
            session['user_id'] = user_id
            session['cargo'] = cargo
            
            # Redireciona conforme o cargo
            if cargo == 'chefia':
                return redirect(url_for('dashboard_chefia'))
            elif cargo == 'operador':
                return redirect(url_for('portal_operador'))
                
        except Exception as e:
            return f"Erro no login: {e}"
            
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

if __name__ == '__main__':
    app.run(debug=True)