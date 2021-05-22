
class Tempo {
	
	mostrarTempo(data){
		this.atualizarTempo(data)
		if (this.valorTempo > 0) {
			return `${this.sShow}${this.minShow}${this.hrShow}${this.diaShow}${this.anoShow}`
		} else {
			return `<span class="text-danger">Expirado</span>`
		}
		
	}

	atualizarTempo(data){
		this.dataAtual = new Date()
		this.dataAtualTime = this.dataAtual.getTime()
		this.valorTempo = data - this.dataAtualTime

		this.anoBruto = Math.floor(this.valorTempo/31536000000)
		this.diaBruto = Math.floor(this.valorTempo/86400000)
		this.hrBruto = Math.floor(this.valorTempo/3600000)
		this.minBruto = Math.floor(this.valorTempo/60000)
		this.sBruto = Math.floor(this.valorTempo/1000)

		if (this.valorTempo >= 31536000000) {
			this.ano = this.anoBruto

			this.anoShow = `${this.ano} anos`
		} else {
			this.ano = 0
			this.anoShow = ``
		}

		if (this.valorTempo >= 86400000) {
			this.dia = this.diaBruto
			if (this.valorTempo >= 31536000000) {
				this.dia = this.dia%(this.anoBruto*12)
			}

			this.diaShow = `${this.dia} dias, `
		} else {
			this.dia = 0
			this.diaShow = ``
		}

		if (this.valorTempo >= 3600000) {
			this.hr = this.hrBruto
			if (this.valorTempo >= 86400000) {
				this.hr = this.hr%(this.diaBruto*24)
			}

			this.hrShow = `${this.hr} horas, `
		} else {
			this.hr = 0
			this.hrShow = ``
		}

		if (this.valorTempo >= 60000) {
			this.min = this.minBruto
			if (this.valorTempo >= 3600000) {
				this.min = this.min%(this.hrBruto*60)
			}

			this.minShow = `${this.min} minutos, `
		} else {
			this.min = 0
			this.minShow = ``
		}

		if (this.valorTempo >= 1000) {
			this.s = this.sBruto
			if (this.valorTempo >= 60000) {
				this.s = this.s%(this.minBruto*60)
			}
			this.sShow = `${this.s} segundos, `
		} 


		if (this.valorTempo >= (31536000000*2)) {
			this.anoShow = `${this.ano} anos`
			this.diaShow = ``
			this.minShow = ``
			this.sShow = ``
			this.hrShow = ``
		} else if (this.valorTempo < (31536000000*2) && this.valorTempo >= 31536000000) {
			this.anoShow = `${this.ano} ano`
			this.diaShow = `${this.dia} dias, `
			this.minShow = ``
			this.sShow = ``
			this.hrShow = ``
		} else if (this.valorTempo < (31536000000) && this.valorTempo >= 86400000*7) {
			this.anoShow = ``
			this.diaShow = `${this.dia} dias`
			this.minShow = ``
			this.sShow = ``
			this.hrShow = ``
		} else if (this.valorTempo < (86400000*7) && this.valorTempo >= 86400000) {
			this.anoShow = ``
			this.diaShow = `${this.dia} dias`
			this.minShow = ``
			this.sShow = ``
			this.hrShow = `${this.hr} horas, `
		} else if (this.valorTempo < (86400000) && this.valorTempo >= 3600000) {
			this.anoShow = ``
			this.diaShow = ``
			this.minShow = `${this.min} minutos, `
			this.sShow = ``
			this.hrShow = `${this.hr} horas`
		} else if (this.valorTempo < (3600000)) {
			this.anoShow = ``
			this.diaShow = ``
			this.minShow = `${this.min} minutos`
			this.sShow = `${this.s} segundos, `
			this.hrShow = ``
		}
	}}

class Bd {
	constructor() {
		let id = localStorage.getItem('id')
		if (id == null || id == NaN) {
			localStorage.setItem('id', 0)
		}
	}
	proximoId() {
		let proximoId = localStorage.getItem('id')
		return (parseInt(proximoId)+1)
	}
	gravar(d) {
		let id = this.proximoId()
		localStorage.setItem(id, JSON.stringify(d))
		localStorage.setItem('id', id)
	}
	recuperar() {
		let id = localStorage.getItem('id')
		let lista = Array()

		for (let i = 1; i <= id; i++){
			let recuperado = JSON.parse(localStorage.getItem(i))

			if (recuperado == null) {
				continue
			}
			recuperado.id = i
			lista.push(recuperado)
			lista.sort(function(a, b){
				if (a.tempoTotal > b.tempoTotal) {
					return 1
				}
				if (a.tempoTotal < b.tempoTotal) {
					return -1
				}
				if (a.tempoTotal == b.tempoTotal) {
					return 0
				}
			})
		}
		return (lista)
	}
	apagar(id){
		localStorage.removeItem(id)
	}}

let bd = new Bd()

let escolhaPlataforma
let escolhaMateria
let escolaModulo
let escolhaAula

class FB {
	constructor(){
		this.materias = ['Matematica', 'Fisica']

		this.matematica = ['Modulo 1 - Algebra', 'Modulo 2 - Funções, Trigonometria e Geometria',
		'Modulo 3 - Combinatória, Probabilidade e Estatítica', 'Modulo 4 - Geometria Plana e Espacial',
		'Modulo 5 - Medicina I', 'Modulo 6 - Medicina II']

		this.matematica_modulo1 = 
		[
		'Aula 1 - Conjuntos Numéricos – parte I',
		'Aula 2 - Conjuntos Numéricos – parte II',
		'Aula 3 - Sistemas de Numeração',
		'Aula 4 - Sistemas de Numeração Posicional (outras bases)',
		'Aula 5 - Operação nos Inteiros – parte I'
		]

		this.matematica_modulo1_aula1 = 
		['Aula 1 - Conjuntos Numéricos – parte I',
		 "https://drive.google.com/file/d/10ZdrKJe_M35JVY7jI25yDO9nOxtJArql/view?usp=sharing",
		  'https://drive.google.com/file/d/16KuHRTqE0oNPBvut9b71rKWrq1CpfW81/view?usp=sharing']
		this.matematica_modulo1_aula2 = 
		['Aula 2 - Conjuntos Numéricos – parte II',
		 "https://drive.google.com/file/d/1uCTFokks4zg8rCJv5WQ8ECaefyT4Vlsf/view?usp=sharing",
		  'https://drive.google.com/file/d/1AxbU5jr8DhUHey5ik4mzXNm1CjKtC8Ho/view?usp=sharing']
		this.matematica_modulo1_aula3 = 
		['Aula 3 - Sistemas de Numeração',
		 "https://drive.google.com/file/d/1B316EEMA-rtjLY9SemgeZ_tXzesNDJ2k/view?usp=sharing",
		  'https://drive.google.com/file/d/1d96EPkuywREI1BviVF_9msOLSmv4fFal/view?usp=sharing']
		this.matematica_modulo1_aula4 =
		 ['Aula 4 - Sistemas de Numeração Posicional (outras bases)',
		  "https://drive.google.com/file/d/1wV9b81d7XaWKhB6OPf5ZJaTGALMtfTEK/view?usp=sharing",
		  'https://drive.google.com/file/d/1clraMKeRRybThY5MMWpty4fQFQbwAfNJ/view?usp=sharing']
		this.matematica_modulo1_aula5 =
		 ['Aula 5 - Operação nos Inteiros – parte I',
		  "https://drive.google.com/file/d/1e0c8u5IF8rxTpwPlw9IxdyMDEzkFqU6Z/view?usp=sharing",
		  'https://drive.google.com/file/d/1_jZ4nnlJ9zRpo_xVYRf5fM2F3XZJl-ng/view?usp=sharing']






		this.matematica_modulo2 = 
		[
		'Aula 1 - Conjuntos',
		'Aula 2 - Função afim ou função do 1º grau – Parte I',
		'Aula 3 - Função afim ou função do 1º grau – Parte II',
		'Aula 4 - Função quadrática ou função do 2º grau – Parte I',
		'Aula 5 - Função quadrática ou função do 2º grau – Parte II'
		]

		this.matematica_modulo2_aula1 = 
		['Aula 1 - Conjuntos',
		 "https://drive.google.com/file/d/1cLABrgsPptVtJbeXfdfOnuBVDi5W82GP/view?usp=sharing",
		  'https://drive.google.com/file/d/1otZ-cnB16ahztIkGSiMEjchxLc5bvZhN/view?usp=sharing']

		this.matematica_modulo2_aula2 = 
		['Aula 2 - Função afim ou função do 1º grau – Parte I',
		 "https://drive.google.com/file/d/1hfx2u-Yp8AliQLgkwoLAuc3nZy9mc8G1/view?usp=sharing",
		  'https://drive.google.com/file/d/1q9gU1CN59jW0d2FN3d59XS5aWC7UAJvj/view?usp=sharing']

		this.matematica_modulo2_aula3 = 
		['Aula 3 - Função afim ou função do 1º grau – Parte II',
		 "https://drive.google.com/file/d/1-E-q8F687CsZEdHAmSJTY81-gd4bFNpi/view?usp=sharing",
		  'https://drive.google.com/file/d/1qju6I6WvfaFKuQmQFNTUvfaoggZH9Xj4/view?usp=sharing']

		this.matematica_modulo2_aula4 = 
		['Aula 4 - Função quadrática ou função do 2º grau – Parte I',
		 "https://drive.google.com/file/d/1ut-CXviaQwYwQp3a5b9yV4pH9QMXBYdR/view?usp=sharing",
		  'https://drive.google.com/file/d/1_V3RnBLNkWalDRUeYRw9LAV-kg4ltYvU/view?usp=sharing']


		this.matematica_modulo2_aula5 = 
		['Aula 5 - Função quadrática ou função do 2º grau – Parte II',
		 "https://drive.google.com/file/d/1MCQ4tt5iTdAAR42BM8DSksEGakOOQeGa/view?usp=sharing",
		  'https://drive.google.com/file/d/114qGDliaJktgrOPfB-XE3Plg7R1coqZU/view?usp=sharing']







		this.matematica_modulo3 = 
		[
		'Aula 1 - Fatorial',
		'Aula 2 - Princípio Fundamental da Contagem',
		'Aula 3 - Princípio Fundamental da Contagem',
		'Aula 4 - Permutações Simples',
		'Aula 5 - Permutações com elementos repetidos'
		]

		this.matematica_modulo3_aula1 = 
		['Aula 1 - Fatorial',
		 "https://drive.google.com/file/d/1X_kWPuNyD0N_cRpyXmDblvkHmCVrISsG/view?usp=sharing",
		  'https://drive.google.com/file/d/16JGEYEENt3cGuAbDda2SNcV5hFPWn--H/view?usp=sharing']

		this.matematica_modulo3_aula2 = 
		['Aula 2 - Princípio Fundamental da Contagem',
		 "https://drive.google.com/file/d/13uTg3BHs_sQHjAxk4HitfR5LF7ZB0O-S/view?usp=sharing",
		  'https://drive.google.com/file/d/1_3DljvhkK-MJ91arAwSFB0k-Gq5vfWcL/view?usp=sharing']

		this.matematica_modulo3_aula3 = 
		['Aula 3 - Princípio Fundamental da Contagem',
		 "https://drive.google.com/file/d/1uZ93KV9vQfvdn5zCfzOLb5io3YR6OuyZ/view?usp=sharing",
		  'https://drive.google.com/file/d/1JOLAyrjKqMitS0cN6zGe86B0RLy-U5Nk/view?usp=sharing']

		this.matematica_modulo3_aula4 = 
		['Aula 4 - Permutações Simples',
		 "https://drive.google.com/file/d/1vKJUraYd-etygAukB3TFWM-WHxiwETac/view?usp=sharing",
		  'https://drive.google.com/file/d/1qNWQIkPYnvkDJIsgARQLCofg7n56m6Kz/view?usp=sharing']


		this.matematica_modulo3_aula5 = 
		['Aula 5 - Permutações com elementos repetidos',
		 "https://drive.google.com/file/d/1Hbp1JPTMt_DLfv0OGvf-6PgURcg0cPpR/view?usp=sharing",
		  'https://drive.google.com/file/d/164FVVg45zWbukUz-vQf8V6QAw4G_6Zdr/view?usp=sharing']






		this.matematica_modulo4 = 
		[
		'Aula 1 - Geometria primitiva',
		'Aula 2 - Ângulos na circunferência',
		'Aula 3 - Polígonos I',
		'Aula 4 - Polígonos II',
		'Aula 5 - Triângulos'
		]

		this.matematica_modulo4_aula1 = 
		['Aula 1 - Geometria primitiva',
		 "https://drive.google.com/file/d/1dJOo217jRT3GlTzeijIk-zhtiOC2zg0S/view?usp=sharing",
		  'https://drive.google.com/file/d/19USdYY_gyuWQu1KQGWPVI99zcoLj6ndD/view?usp=sharing']

		this.matematica_modulo4_aula2 = 
		['Aula 2 - Ângulos na circunferência',
		 "https://drive.google.com/file/d/1Ued0gH4IV_CR0xl_yjQxK23mjSXmoxxv/view?usp=sharing",
		  'https://drive.google.com/file/d/1IvBmVPcEBLtbDgooMcett84oblgngHBK/view?usp=sharing']

		this.matematica_modulo4_aula3 = 
		['Aula 3 - Polígonos I',
		 "https://drive.google.com/file/d/1vLUcfmK2lY7uEshuYEhwWrNQecmkzIjv/view?usp=sharing",
		  'https://drive.google.com/file/d/13JFIm0dDOs7m2rahY6laxgwoxGrGIRjj/view?usp=sharing']

		this.matematica_modulo4_aula4 = 
		['Aula 4 - Polígonos II',
		 "https://drive.google.com/file/d/14wj7NObALE2r1NBtUeAXisXqoy7-xydT/view?usp=sharing",
		  'https://drive.google.com/file/d/1gtLAM-aHD0TYjZVPrzTZBJJOhL4aLJ_K/view?usp=sharing']


		this.matematica_modulo4_aula5 = 
		['Aula 5 - Triângulos',
		 "https://drive.google.com/file/d/1DCrok48xY8Mag1bC30YC986LRcY3Mjtc/view?usp=sharing",
		  'https://drive.google.com/file/d/1FbEpNVBGFAWNghc5yN28Ie7tC2-DzuDb/view?usp=sharing']




		this.matematica_modulo5 = 
		[
		'Aula 1 - Números complexos (Parte I)',
		'Aula 2 - Números complexos (Partes II e III)',
		'Aula 3 - Noção de funções (Parte I)',
		'Aula 4 - Noção de funções (Parte II)',
		'Aula 5 - Noção de funções (Parte III)'
		]

		this.matematica_modulo5_aula1 = 
		['Aula 1 - Números complexos (Parte I)',
		 "https://drive.google.com/file/d/1Dp7u9U8rVghw0APw6Rjj2NGq-HYj96Cr/view?usp=sharing",
		  'https://drive.google.com/file/d/1a0bg4_6fQoQ0TW9QXBavbWEUUxd4kmgr/view?usp=sharing']

		this.matematica_modulo5_aula2 = 
		['Aula 2 - Números complexos (Partes II e III)',
		 "https://drive.google.com/file/d/1woDcUdOs9o50pYwjVkToR6FYhvoHggvM/view?usp=sharing",
		  'https://drive.google.com/file/d/1sdV_8jopvpUDrPUT5BKL1R6zIGAy5n9x/view?usp=sharing']

		this.matematica_modulo5_aula3 = 
		['Aula 3 - Noção de funções (Parte I)',
		 "https://drive.google.com/file/d/1zYUld-lDyme3eY-7o-1pMU9k6JYjPqEt/view?usp=sharing",
		  'https://drive.google.com/file/d/1lyP03WKYb28cP50ImXs4O0xJelIy5cCv/view?usp=sharing']

		this.matematica_modulo5_aula4 = 
		['Aula 4 - Noção de funções (Parte II)',
		 "https://drive.google.com/file/d/1JrWvVoFsdNuK1-32PDqvXGofOXdne0uQ/view?usp=sharing",
		  'https://drive.google.com/file/d/1ipzmcXihfb8IyQj7TgqYRQsM3I4e9aaY/view?usp=sharing']


		this.matematica_modulo5_aula5 = 
		['Aula 5 - Noção de funções (Parte III)',
		 "https://drive.google.com/file/d/15NGktFIGiQHZhLpTjuV55Bo8egfZLGav/view?usp=sharing",
		  'https://drive.google.com/file/d/1B1F59whh6JIDMFrDnGrYe8hLtjw_sBqZ/view?usp=sharing']




		this.matematica_modulo6 = 
		[
		'Aula 1 - Números Binomiais e Triângulo de Pascal',
		'Aula 2 - Binômio de Newton I',
		'Aula 3 - Binômio de Newton II',
		'Aula 4 - Elipse',
		'Aula 5 - Hipérbole'
		]

		this.matematica_modulo6_aula1 = 
		['Aula 1 - Números Binomiais e Triângulo de Pascal',
		 "https://drive.google.com/file/d/1rFgFVZtQ4Hwer7mbUgQykDGsb9ofdyko/view?usp=sharing",
		  'https://drive.google.com/file/d/1sYHpURzFAgsodeUXa6R50aybfhDgtD1c/view?usp=sharing']

		this.matematica_modulo6_aula2 = 
		['Aula 2 - Binômio de Newton I',
		 "https://drive.google.com/file/d/1ESxzw3hTkLVr8X_dPBnr1KTJ2nDWPlaN/view?usp=sharing",
		  'https://drive.google.com/file/d/10JgpqEx1DbSA0m1D09kTX-_qZDduygVr/view?usp=sharing']

		this.matematica_modulo6_aula3 = 
		['Aula 3 - Binômio de Newton II',
		 "https://drive.google.com/file/d/1GhDRYBmTcu9fiiAuw4V-HcMDSnk57DoA/view?usp=sharing",
		  'https://drive.google.com/file/d/1reyIHvEqGimd3aAvm2XjPyAg7IrebJE6/view?usp=sharing']

		this.matematica_modulo6_aula4 = 
		['Aula 4 - Elipse',
		 "https://drive.google.com/file/d/1AHTWy29A-oa5eujaW3HNDn5ynlqJwx8-/view?usp=sharing",
		  'https://drive.google.com/file/d/1NsAz98U5DXIfIGeuiYnSb_C-Y6g5SHG7/view?usp=sharing']


		this.matematica_modulo6_aula5 = 
		['Aula 5 - Hipérbole',
		 "https://drive.google.com/file/d/1MYu_tUuYaVM_Z2_LU2q6fQ0hHbp53H8j/view?usp=sharing",
		  'https://drive.google.com/file/d/1boPpr7lx_VmLQ-afzunVI0CSBiUZz4yN/view?usp=sharing']







		this.fisica = ['Modulo 1 - Mecânica', 'Modulo 2 - Eletricidade e Magnetismo',
		 'Modulo 3 - Termologia e Ondas', 'Modulo 4 - Optica, Hidroestática e Gravitação',
		  'Modulo 5 - Medicina I', 'Modulo 6 - Medicina II']

		this.fisica_modulo1 = 
		[
		'Aula 1 - Movimento Uniforme I',
		'Aula 2 - Movimento Uniforme II',
		'Aula 3 - Movimento Variado I',
		'Aula 4 - Movimento Variado II',
		'Aula 5 - Queda Livre'
		]

		this.fisica_modulo1_aula1 = 
		['Aula 1 - Movimento Uniforme I',
		 "https://drive.google.com/file/d/1zy5-ionVhw17_4lbxzOBY2o4XOedri6d/view?usp=sharing",
		  'https://drive.google.com/file/d/1b4Tczv95hci3WjOCLYfrpYdaS03ycJUa/view?usp=sharing']

		this.fisica_modulo1_aula2 = 
		['Aula 2 - Movimento Uniforme II',
		 "https://drive.google.com/file/d/1IzvSJ85AFmCHQMkXa1j1EknaanRWAr-n/view?usp=sharing",
		  'https://drive.google.com/file/d/1nVOinZiL0TC5VQCkc7sFWj7DYDBULmim/view?usp=sharing']

		this.fisica_modulo1_aula3 = 
		['Aula 3 - Movimento Variado I',
		 "https://drive.google.com/file/d/1YmRe1tFVC54KBq4PVKJ8I5ixL9qNqgNX/view?usp=sharing",
		  'https://drive.google.com/file/d/16xU8VHCmM8n23cWITmQr1G_l0fquHfct/view?usp=sharing']

		this.fisica_modulo1_aula4 = 
		['Aula 4 - Movimento Variado II',
		 "https://drive.google.com/file/d/1dBM5bw9pPHnHN13u3XvJgJrwKyOM4W4w/view?usp=sharing",
		  'https://drive.google.com/file/d/1w29FuBGAyOdu3kgyLcvXL_mFG-rZb7Bz/view?usp=sharing']

		this.fisica_modulo1_aula5 = 
		['Aula 5 - Queda Livre',
		 "https://drive.google.com/file/d/1VF9M2zsNsQz2Qlm3gtLd3yV-IE8AE_As/view?usp=sharing",
		  'https://drive.google.com/file/d/1u_FrBFyGWl7VWntfl7phg5z5KP0veGPm/view?usp=sharing']



		this.fisica_modulo2 = 
		[
		'Aula 1 - Noções de carga elétrica',
		'Aula 2 - Processos de eletrização',
		'Aula 3 - Força elétrica – Lei de Coulomb',
		'Aula 4 - Campo elétrico',
		'Aula 5 - Campo elétrico uniforme'
		]

		this.fisica_modulo2_aula1 = 
		['Aula 1 - Noções de carga elétrica',
		 "https://drive.google.com/file/d/1xrKvJHbut34kTcvGz1hh0WU6Ht1G4wH9/view?usp=sharing",
		  'https://drive.google.com/file/d/1djm9G-VBu-JjmYDH-tdQsemDPpNnAgO6/view?usp=sharing']

		this.fisica_modulo2_aula2 = 
		['Aula 2 - Processos de eletrização',
		 "https://drive.google.com/file/d/144MtYEX8GmpLqOdAfQBIOKMVKpBVtQ9c/view?usp=sharing",
		  'https://drive.google.com/file/d/1XeQg1i-Fdu_724ev1P1-juQE7efhbTvD/view?usp=sharing']

		this.fisica_modulo2_aula3 = 
		['Aula 3 - Força elétrica – Lei de Coulomb',
		 "https://drive.google.com/file/d/1jqZgpiXl0erK_duzA-zLLVysOOQRRoYQ/view?usp=sharing",
		  'https://drive.google.com/file/d/1-NbhI_2KdwXWMGIjhkZmdSMdIR695snQ/view?usp=sharing']

		this.fisica_modulo2_aula4 = 
		['Aula 4 - Campo elétrico',
		 "https://drive.google.com/file/d/1-uk3X9JriPoSjtEDFWrv__6DzTNse5wt/view?usp=sharing",
		  'https://drive.google.com/file/d/1Ei-GddcslJArmUZv8PUt-G4sV7prwlYl/view?usp=sharing']


		this.fisica_modulo2_aula5 = 
		['Aula 5 - Campo elétrico uniforme',
		 "https://drive.google.com/file/d/17IpTexudIo9SNDdocmfRRxcmL1mVWOfp/view?usp=sharing",
		  'https://drive.google.com/file/d/198-TVZeHhL2ovK95Fi6ksESq-7Lhpi7r/view?usp=sharing']







		this.fisica_modulo3 = 
		[
		'Aula 1 - Energia térmica e escalas termométricas',
		'Aula 2 - Dilatação dos sólidos',
		'Aula 3 - Dilatação dos líquidos',
		'Aula 4 - Calor como mecanismo para variação da energia térmica: energia interna sensível',
		'Aula 5 - Sistemas termicamente isolados'
		]

		this.fisica_modulo3_aula1 = 
		['Aula 1 - Energia térmica e escalas termométricas',
		 "https://drive.google.com/file/d/1DvcKxu9Yks73oNrd7rWtqw1xMLCl7R8d/view?usp=sharing",
		  'https://drive.google.com/file/d/19px9SrsFFhaIe3swy4Rkd_xPm3-qozOC/view?usp=sharing']

		this.fisica_modulo3_aula2 = 
		['Aula 2 - Dilatação dos sólidos',
		 "https://drive.google.com/file/d/1H9LxwDh8M69gb8TrAb2pDYoau3_U3fmT/view?usp=sharing",
		  'https://drive.google.com/file/d/1rN8V5_HQbf79jevuDSCbRZH-_Yr_ATLq/view?usp=sharing']

		this.fisica_modulo3_aula3 = 
		['Aula 3 - Dilatação dos líquidos',
		 "https://drive.google.com/file/d/1lZKlbhBWkF-ESs9rL6My59SD-U49fHhj/view?usp=sharing",
		  'https://drive.google.com/file/d/1i0SXbTlkH4qY7oZZ6gYbl1XG-mWwJ2ev/view?usp=sharing']

		this.fisica_modulo3_aula4 = 
		['Aula 4 - Calor como mecanismo para variação da energia térmica: energia interna sensível',
		 "https://drive.google.com/file/d/1YiBsZyKw2SlC1fv2wQDx84A3wxHIbsUB/view?usp=sharing",
		  'https://drive.google.com/file/d/1xaYIBcdLTr1cVS_vXbN-720FBZIDCqn_/view?usp=sharing']


		this.fisica_modulo3_aula5 = 
		['Aula 5 - Sistemas termicamente isolados',
		 "https://drive.google.com/file/d/1z2Cni9pzTTTzvwFZwhGXPnbVv_SaU0G4/view?usp=sharing",
		  'https://drive.google.com/file/d/17EK0sdC-t8bxXfYgZ3Wz7dFygXHSDX9c/view?usp=sharing']






		this.fisica_modulo4 = 
		[
		'Aula 1 - Introdução à Óptica Geométrica',
		'Aula 2 - Espelhos Planos I',
		'Aula 3 - Espelhos Planos II',
		'Aula 4 - Espelhos Esféricos I',
		'Aula 5 - Espelhos Esféricos II'
		]

		this.fisica_modulo4_aula1 = 
		['Aula 1 - Introdução à Óptica Geométrica',
		 "https://drive.google.com/file/d/1xxJ-o9UgVxrhGDL5o6KdXKh3rgNHAA3X/view?usp=sharing",
		  'https://drive.google.com/file/d/1FUKkqs2DzkNhm2MdYiAcDQVvcXhKew61/view?usp=sharing']

		this.fisica_modulo4_aula2 = 
		['Aula 2 - Espelhos Planos I',
		 "https://drive.google.com/file/d/1kjR3ik1egIECQ2ICTkuYOVEBll9hJcP_/view?usp=sharing",
		  'https://drive.google.com/file/d/1Avsw9g5usUAyWK2GQYw9XYD_DFxDKTbV/view?usp=sharing']

		this.fisica_modulo4_aula3 = 
		['Aula 3 - Espelhos Planos II',
		 "https://drive.google.com/file/d/1rDlpDI5-pI4dMMQDfbqZ4hbS2WInE8Q-/view?usp=sharing",
		  'https://drive.google.com/file/d/10jneVhZIwzO2opVZaQo193ecxwPHn6rw/view?usp=sharing']

		this.fisica_modulo4_aula4 = 
		['Aula 4 - Espelhos Esféricos I',
		 "https://drive.google.com/file/d/1-0FYRheNwfhs2lo_b8iWotBf9Juv1fVX/view?usp=sharing",
		  'https://drive.google.com/file/d/1Vy_Jc4K73pC44wzE0ajI5gP1X819sV58/view?usp=sharing']


		this.fisica_modulo4_aula5 = 
		['Aula 5 - Espelhos Esféricos II',
		 "https://drive.google.com/file/d/1GAXlYJV6YdbSYSaiD7iUHNAiV3bI-F-L/view?usp=sharing",
		  'https://drive.google.com/file/d/1hZguOE-N6VrLQ3UKrTWzkOgc1PjQZtdB/view?usp=sharing']




		this.fisica_modulo5 = 
		[
		'Aula 1 - Resistência do ar',
		'Aula 2 - Atrito estático e cinético no freio ABS',
		'Aula 3 - Hidrodinâmica',
		'Aula 4 - Miragem e Fata Morgana',
		'Aula 5 - Campo elétrico e poder das pontas'
		]

		this.fisica_modulo5_aula1 = 
		['Aula 1 - Resistência do ar',
		 "https://drive.google.com/file/d/1R71t4MQClfxYIIWVeNj0sK0YTXt-uyLk/view?usp=sharing",
		  'https://drive.google.com/file/d/1cn6Y42jEdVu6j1LYxsXC8VTE9luBcbSC/view?usp=sharing']

		this.fisica_modulo5_aula2 = 
		['Aula 2 - Atrito estático e cinético no freio ABS',
		 "https://drive.google.com/file/d/1xIXxkRrk07iwT9gFxvPLkhcRRbKtz4Uw/view?usp=sharing",
		  'https://drive.google.com/file/d/1dZ69n8w3kOhYdvXpDgcYb_uUWYqhQT3B/view?usp=sharing']

		this.fisica_modulo5_aula3 = 
		['Aula 3 - Hidrodinâmica',
		 "https://drive.google.com/file/d/1EQXsICpd0liq4O33fTITJI0kxnWD60Ae/view?usp=sharing",
		  'https://drive.google.com/file/d/1drFeVdzhkTyrJJPvzrwt8nl0VP7x9Z8a/view?usp=sharing']

		this.fisica_modulo5_aula4 = 
		['Aula 4 - Miragem e Fata Morgana',
		 "https://drive.google.com/file/d/1F13xcuQpgt7e1l-8pZxMwafrVGKjaG-3/view?usp=sharing",
		  'https://drive.google.com/file/d/1HSmyO-cSMmaQk28iSHPfo7DTVOCFxJcL/view?usp=sharing']


		this.fisica_modulo5_aula5 = 
		['Aula 5 - Campo elétrico e poder das pontas',
		 "https://drive.google.com/file/d/1pJ9B1vp_IpaPNQ_i2w99FmE_vIyCIyVT/view?usp=sharing",
		  'https://drive.google.com/file/d/1VKFbpCZ6uP8Jt0r3QfzeE07cPDHc983l/view?usp=sharing']




		this.fisica_modulo6 = 
		[
		'Aula 1 - Teoria da Relatividade',
		'Aula 2 - Efeito fotoelétrico',
		'Aula 3 - Física Quântica e o átomo de Bohr',
		'Aula 4 - Tecnologias relacionadas à indução eletromagnética',
		'Aula 5 - Função de onda'
		]

		this.fisica_modulo6_aula1 = 
		['Aula 1 - Teoria da Relatividade',
		 "https://drive.google.com/file/d/1VnzZOljNY7S9ip5qBYvkuL-Heyz7v7nt/view?usp=sharing",
		  'https://drive.google.com/file/d/1P71-deHtU08f00nfH27eDOxXvK3X5b9e/view?usp=sharing']

		this.fisica_modulo6_aula2 = 
		['Aula 2 - Efeito fotoelétrico',
		 "https://drive.google.com/file/d/1mgCxqapP2W0kTjcH-EX0AYwqYIPB_s00/view?usp=sharing",
		  'https://drive.google.com/file/d/1FajJjT8JUdeXKHF1DVf2lrxziMl81nt4/view?usp=sharing']

		this.fisica_modulo6_aula3 = 
		['Aula 3 - Física Quântica e o átomo de Bohr',
		 "https://drive.google.com/file/d/1PPV5rqHsRDV11x12ZifwzPMMCBJCBJP3/view?usp=sharing",
		  'https://drive.google.com/file/d/1u7Fdmbvk4coa0AOwwhm3Cff7gfUZPuPm/view?usp=sharing']

		this.fisica_modulo6_aula4 = 
		['Aula 4 - Tecnologias relacionadas à indução eletromagnética',
		 "https://drive.google.com/file/d/1qoUSqwIurELLolbuZcwhBc767bp7yoeE/view?usp=sharing",
		  'https://drive.google.com/file/d/1fqquL9otE8QF-ITAlCkHu_2OrdVpYTej/view?usp=sharing']


		this.fisica_modulo6_aula5 = 
		['Aula 5 - Função de onda',
		 "https://drive.google.com/file/d/1FnlhpW1pT_Ar9MEsT9j9QbnCIrpynzWq/view?usp=sharing",
		  'https://drive.google.com/file/d/1knKj_UQGR4CLcme4nw_AM7PEX44TtV6D/view?usp=sharing']




























		//this.fisica_modulo1_aula1 = 
		//['aula',
		// "linkaula",
		  //'linklista']
		
		
	}}

let fb = new FB()

class Box {
	constructor(hora, dia, mes, ano, materia, descricao, titulo, tempo, aula, linkAula, linkLista) {
		this.hora = hora
		this.dia = dia
		this.mes = mes
		this.ano = ano
		this.materia = materia
		this.descricao = descricao
		this.titulo = titulo

		this.tempoTotal = tempo
		this.aula = aula
		this.linkAula = linkAula
		this.linkLista = linkLista
	}
	validar(){
		for(let i in this){
			if (this[i] == null || this[i] == '' || this[i] == undefined) {return false}
		}
	}}

function salvarTarefa() {
	let hora = document.getElementById('hora').value
	let dia = document.getElementById('dia').value
	let mes = document.getElementById('mes').value
	let ano = document.getElementById('ano').value
	let descricao = document.getElementById('descricao').value
	let titulo = document.getElementById('titulo').value

	let variavelAula
	let aula
	let linkAula
	let linkLista

	let materia = escolhaMateria
	escolhaAula = document.getElementById('aula').value

	if (escolhaAula == undefined || escolhaAula == '') {

		 aula = 'na'
		 linkAula = 'na'
		 linkLista = 'na'
	} else {
		variavelAula = `${escolhaPlataforma}.${escolhaMateria}_${escolaModulo}_${escolhaAula}`
		variavelAula = eval(variavelAula)
		aula = variavelAula[0]
		linkAula = variavelAula[1]
		linkLista = variavelAula[2]
	}
	


	let tempoSalvar = new Date(ano, mes, dia, hora)

	if (hora > 23){
		
		document.getElementById('hora').className = 'form-control bg-danger'
		document.getElementById('hora').value = ''
		if (dia <= 31) {
			document.getElementById('dia').className = 'form-control'
		} else {
			document.getElementById('dia').className = 'form-control bg-danger'
			document.getElementById('dia').value = ''
		}

	} else if (dia > 31) {
		document.getElementById('hora').className = 'form-control'
		document.getElementById('dia').className = 'form-control bg-danger'
		document.getElementById('dia').value = ''
	} else {
		let tarefa = new Box(hora, dia, mes, ano, materia, descricao, titulo, tempoSalvar.getTime(), aula, linkAula, linkLista)
	
		if (tarefa.validar() == false) {
			alert('Algo não foi preenchido')
		} else {
			bd.gravar(tarefa)
		    console.log(bd.recuperar())

		    document.getElementById('hora').className = 'form-control'
		    document.getElementById('dia').className = 'form-control'

		    document.getElementById('hora').value = ''
			document.getElementById('dia').value = ''
			document.getElementById('mes').value = ''
			document.getElementById('ano').value = '2020'
			document.getElementById('descricao').value = ''
			document.getElementById('titulo').value = ''

			document.getElementById('plataforma').value = ''
			document.getElementById('materia').value = ''
			document.getElementById('modulo').value = ''
			document.getElementById('aula').value = ''

			document.getElementById('radio2').checked = true
			radioNao()

			escolhaPlataforma = ''
			escolhaAula = ''
			escolhaMateria = ''
			escolaModulo = ''
		    
		}
	}}

function cardTarefa(materia, descricao, tempo, titulo, botao, cor, botaoAulaLista) {
	let tarefa = document.getElementById('areaPrincipal')
	tarefa.innerHTML += `<div class="col-md-4 mt-2">
                <div class="card">
                    <div class="card-header bg-${cor}">
                        <h5 class="d-inline">${materia}</h5> ${botao}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${titulo}</h5>
                        <p class="card-text">
                            ${descricao}
                        </p>
                        ${botaoAulaLista}
                        
                        	
                        
                        </p>
                    </div>
                    <div class="card-footer">
                        ${tempo}
                    </div>
                </div>
            </div>
	`}

function ajustarTarefa() {
	terefas = Array()
	tarefas = bd.recuperar()

	let texto = document.getElementById('areaPrincipal')
	texto.innerHTML = ''

	tarefas.forEach(function(d){
		let hora = d.hora
		let dia = d.dia
		let mes = d.mes
		let ano = d.ano
		let materia = d.materia
		let descricao = d.descricao
		let titulo = d.titulo
		let id = d.id
		let aula = d.aula
		let linkAula = d.linkAula
		let linkLista = d.linkLista

		let dataTarefaBase = new Date(ano, mes, dia, hora)
		let dataTarefa = new Tempo()
		let dataFinal = dataTarefa.mostrarTempo(dataTarefaBase.getTime())

		let botaoApagar = `<buttom class="btn btn-danger float-right" onclick="apagar(${id})">
		<i class='fas fa-times'></i>
		</buttom>`

		let cor
		if (materia == 'matematica') {
			cor = "primary"
			materia = 'Matemática'
		}

		if (materia == 'fisica') {
			cor = "warning"
			materia = 'Física'
		}

		if (materia == 'quimica') {
			cor = "success"
			materia = 'Química'
		}


		let botaoAulaLista = `<buttom class="btn btn-outline-${cor} mt-2 d-block" onclick="window.open('${linkAula}')">                       
                        	${aula}
                        </buttom>

                        <buttom class="btn btn-outline-${cor} mt-2 d-block" onclick="window.open('${linkLista}')">                       
                        	Lista
                        </buttom>`
        if (aula == 'na' || aula == 'na'){botaoAulaLista = ''}
		cardTarefa(materia, descricao, dataFinal, titulo, botaoApagar, cor, botaoAulaLista)
	})}

function atualizar() {
	setInterval(function(){
		ajustarTarefa()

	}, 1000)}

function apagar(id){bd.apagar(id)}

function proximaMateria(id) {
	
	let idTrue = eval(id)
	console.log(id)

	escolhaPlataforma = id

	document.getElementById('materia').innerHTML = `<option value="">Matéria</option>`
	document.getElementById('modulo').innerHTML = `<option value="">Módulo</option>`
	document.getElementById('aula').innerHTML = `<option value="">Aula</option>`

	if (idTrue != undefined) {
		idTrue.materias.forEach(function(d){
			let valor = d.toLowerCase()
			document.getElementById('materia').innerHTML += `<option value='${valor}'>${d}</option>`
		})
	}}

function proximoModulo(id) {
	
	console.log(id)
	escolhaMateria = id

	document.getElementById('modulo').innerHTML = `<option value="">Módulo</option>`
	document.getElementById('aula').innerHTML = `<option value="">Aula</option>`
	if (escolhaPlataforma != undefined && escolhaPlataforma != '') {
		if (id != undefined && id !='') {
			idTrue = `${escolhaPlataforma}.${id}`
			idTrue = eval(idTrue)
				
			idTrue.forEach(function(d){
				let locTraco = eval(d.indexOf('-'))
				console.log(locTraco)
				
				let valor = d.slice(0, locTraco)
			 	valor = valor.toLowerCase()
				valor = valor.replace(/\s/g, '')
				console.log(valor)

				document.getElementById('modulo').innerHTML += `<option value='${valor}'>${d}</option>`
			})	
		}
	}}

function proximaAula(id) {
	console.log(id)

	escolaModulo = id

	idTrue = `${escolhaPlataforma}.${escolhaMateria}_${id}`
	idTrue = eval(idTrue)
	console.log(idTrue)

	document.getElementById('aula').innerHTML = `<option value="">Aula</option>`

	if (idTrue != undefined) {
		idTrue.forEach(function(d){
			let locTraco = eval(d.indexOf('-'))
			console.log(locTraco)

			let valor = d.slice(0, locTraco)
			valor = valor.toLowerCase()
			valor = valor.replace(/\s/g, '')

			document.getElementById('aula').innerHTML += `<option value='${valor}'>${d}</option>`
		})
	}}

function radioSim() {
	document.getElementById('plataforma').disabled = false
	document.getElementById('modulo').disabled = false
	document.getElementById('aula').disabled = false
	document.getElementById('materia').innerHTML = '<option value="">Matéria</option>'}

function radioNao() {
	document.getElementById('plataforma').disabled = true
	document.getElementById('modulo').disabled = true
	document.getElementById('aula').disabled = true

	document.getElementById('plataforma').value = ''
	document.getElementById('modulo').value = ''
	document.getElementById('aula').value = ''
	document.getElementById('materia').value = ''
	document.getElementById('materia').innerHTML = `<option value="">Matéria</option>
													<option value="matematica">Matematica</option>
													<option value="fisica">Fisica</option>
													<option value="quimica">Quimica</option>` } 