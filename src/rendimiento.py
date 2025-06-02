import psutil
import time
import os

try:
    from pynvml import nvmlInit, nvmlDeviceGetHandleByIndex, nvmlDeviceGetMemoryInfo, nvmlDeviceGetUtilizationRates
    nvmlInit()  # Inicializar la librería de NVIDIA
    gpu_available = True
except ImportError:
    print("Advertencia: No se encontró 'pynvml', la medición de GPU solo funcionará en tarjetas NVIDIA.")
    gpu_available = False

def obtener_uso_gpu():
    """Obtiene el uso de la GPU y la memoria utilizada (solo para tarjetas NVIDIA)."""
    if gpu_available:
        try:
            handle = nvmlDeviceGetHandleByIndex(0)  # Solo se toma la GPU 0
            memoria = nvmlDeviceGetMemoryInfo(handle)
            uso = nvmlDeviceGetUtilizationRates(handle)
            return uso.gpu, memoria.used / memoria.total * 100  # Uso de GPU (%) y memoria (%)
        except Exception as e:
            return 0, 0
    return 0, 0

def monitorear():
    """Muestra el rendimiento del sistema y lo envía a la base de datos en tiempo real."""
    try:
        while True:
            # Obtener métricas
            uso_cpu = psutil.cpu_percent(interval=1)
            uso_ram = psutil.virtual_memory().percent
            uso_disco = psutil.disk_usage('/').percent
            uso_gpu, memoria_gpu = obtener_uso_gpu()
            
            # Mostrar en consola
            os.system('cls' if os.name == 'nt' else 'clear')
            print(f"CPU:     {uso_cpu}%")
            print(f"RAM:     {uso_ram}%")
            print(f"Disco:   {uso_disco}%")
            print(f"GPU:     {uso_gpu}%")
            print(f"VRAM:    {memoria_gpu}%")

            time.sleep(1)  # Envía datos cada 1 segundos
    except KeyboardInterrupt:
        print("\nMonitoreo detenido.")

if __name__ == "__main__":
    monitorear()