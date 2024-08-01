import React, { useState } from 'react';
import './NoVisitar.css';
import Sidebar from './Sidebar';

function NoVisitar(props) {

    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = function(evento) {
      setSidebarVisible(!sidebarVisible);
    };
  


  return (
    <div  className="NoVisitar">
        <Sidebar visible={sidebarVisible} usuario = {props.usuario}/>

        <button className="toggle-btn" onClick={toggleSidebar}><img src="img territorios/menu2.png" alt="Toggle Sidebar" /></button>

        <div className={`content ${sidebarVisible ? 'visibleContent' : 'hiddenContent'}`}>
        <div id="Titulo"> 
            <hr/>
            <h1>No visitar </h1>
            <hr/>
        </div>

        
        <details open>
            <summary>Territorio 1</summary>
            <img src={"img territorios/Territorio 1.png"} width="600"/>
        </details>
        <details>
            <summary>Territorio 2</summary>
            <img src="img territorios/Territorio 2.png" width="600"/>
        </details>
        <details>
            <summary>Territorio 3</summary>
            <img src="img territorios/Territorio 3.png" width="600"/>
        </details>
        <details>
            <summary>Territorio 4</summary>
            <img src="img territorios/Territorio 4.png" width="600"/>
        </details>
        <details>
            <summary>Territorio 5</summary>
            <img src="img territorios/Territorio 5.png" width="600"/>
        </details>
        <details>
            <summary>Territorio 6</summary>
            <img src="img territorios/Territorio 6.png" width="600"/>
        </details>
        <details>
            <summary>Territorio 7</summary>
            <img src="img territorios/Territorio 7.png" width="600"/>
        </details>
        <details>
            <summary>Territorio 8</summary>
          <img src="img territorios/Territorio 8.png" width="600"/>
        </details>
    
        <details>
            <summary>Territorio 9</summary>
        <img src="img territorios/Territorio 9.png" width="600"/>
        </details>
        <details>
            <summary>Territorio 10</summary>
        <img src="img territorios/Territorio 10.png"width="600"/>
        </details>
        <details>
            <summary>Territorio 11</summary>
        <img src="img territorios/Territorio 11.png" width="600"/>
        </details>
        <details>
            <summary>Territorio 12</summary>
           <img src="img territorios/Territorio 12.png" width="600"/>
        </details>
        <details>
            <summary>Territorio 13</summary>
        <img src="img territorios/Territorio 13.png" width="600"/>
        </details><details>
            <summary>Territorio 14</summary>
        <img src="img territorios/Territorio 14.png" width="600"/>
        </details><details>
            <summary>Territorio 15</summary>
        <img src="img territorios/Territorio 15.png" width="600"/>
        </details><details>
            <summary>Territorio 16</summary>
        <img src="img territorios/Territorio 16.png" width="600"/>
        </details><details>
            <summary>Territorio 17</summary>
         <img src="img territorios/Territorio 17.png" width="600"/>
        </details><details>
            <summary>Territorio 18</summary>
        <img src="img territorios/Territorio 18.png" width="600"/>
        </details><details>
            <summary>Territorio 19</summary>
        <img src="img territorios/Territorio 19.png" width="600"/>
        </details><details>
            <summary>Territorio 20</summary>
            <img src="img territorios/Territorio 20.png" width="600"/>
        </details><details>
            <summary>Territorio 21</summary>
        <img src="img territorios/Territorio 21.png" width="600"/>
        </details><details>
            <summary>Territorio 22</summary>
          <img src="img territorios/Territorio 22.png" width="600"/>
        </details><details>
            <summary>Territorio 23</summary>
        <img src="img territorios/Territorio 23.png" width="600"/>
        </details><details>
            <summary>Territorio 24</summary>
        <img src="img territorios/Territorio 24.png" width="600"/>
        </details><details>
            <summary>Territorio 25</summary>
        <img src="img territorios/Territorio 25.png" width="600"/>
        </details><details>
            <summary>Territorio 26</summary>
        <img src="img territorios/Territorio 26.png" width="600"/>
        </details><details>
            <summary>Territorio 27</summary>
        <img src="img territorios/Territorio 27.png" width="600"/>
        </details><details>
            <summary>Territorio 28</summary>
        <img src="img territorios/Territorio 28.png" width="600"/>
        </details><details>
            <summary>Territorio 29</summary>
         <img src="img territorios/Territorio 29.png" width="600"/>
        </details><details>
            <summary>Territorio 30</summary>
        <img src="img territorios/Territorio 30.png" width="600"/>
        </details><details>
            <summary>Territorio 31</summary>
        <img src="img territorios/Territorio 31.png" width="600"/>
        </details><details>
            <summary>Territorio 32</summary>
        <img src="img territorios/Territorio 32.png" width="600"/>
        </details><details>
            <summary>Territorio 33</summary>
        <img src="img territorios/Territorio 33.png" width="600"/>
        </details><details>
            <summary>Territorio 34</summary>
        <img src="img territorios/Territorio 34.png" width="600"/>
        </details><details>
            <summary>Territorio 35</summary>
        <img src="img territorios/Territorio 35.png" width="600"/>
        </details><details>
            <summary>Territorio 36</summary>
        <img src="img territorios/Territorio 36.png" width="600"/>
        </details><details>
            <summary>Territorio 37</summary>
        <img src="img territorios/Territorio 37.png" width="600"/>
        </details><details>
            <summary>Territorio 38</summary>
        <img src="img territorios/Territorio 38.png" width="600"/>
        </details><details>
            <summary>Territorio 39</summary>
        <img src="img territorios/Territorio 39.png" width="600"/>
        </details><details>
            <summary>Territorio 40</summary>
        <img src="img territorios/Territorio 40.png" width="600"/>
        </details><details>
            <summary>Territorio 41</summary>
        <img src="img territorios/Territorio 41.png" width="600"/>
        </details><details>
            <summary>Territorio 42</summary>
        <img src="img territorios/Territorio 42.png" width="600"/>
        </details><details>
            <summary>Territorio 43</summary>
          <img src="img territorios/Territorio 43.png" width="600"/>
        </details><details>
            <summary>Territorio 44</summary>
        <img src="img territorios/Territorio 44.png" width="600"/>
        </details><details>
            <summary>Territorio 45</summary>
        <img src="img territorios/Territorio 45.png" width="600"/>
        </details><details>
            <summary>Territorio 46</summary>
          <img src="img territorios/Territorio 46.png" width="600"/>
        </details><details>
            <summary>Territorio 47</summary>
        <img src="img territorios/Territorio 47.png" width="600"/>
        </details><details>
            <summary>Territorio 48</summary>
         <img src="img territorios/Territorio 48.png" width="600"/>
        </details><details>
            <summary>Territorio 49</summary>
        <img src="img territorios/Territorio 49.png" width="600"/>
        </details><details>
            <summary>Territorio 50</summary>
        <img src="img territorios/Territorio 50.png" width="600"/>
        </details><details>
            <summary>Territorio 51</summary>
           <img src="img territorios/Territorio 51.png" width="600"/>
        </details><details>
            <summary>Territorio 52</summary>
           <img src="img territorios/Territorio 52.png" width="600"/>
        </details><details>
            <summary>Territorio 53</summary>
            <img src="img territorios/Territorio 53.png" width="600"/>
        </details><details>
            <summary>Territorio 54</summary>
            <img src="img territorios/Territorio 54.png" width="600"/>
        </details><details>
            <summary>Territorio 55</summary>
          <img src="img territorios/Territorio 55.png" width="600"/>
        </details><details>
            <summary>Territorio 56</summary>
          <img src="img territorios/Territorio 56.png" width="600"/>
        </details><details>
            <summary>Territorio 57</summary>
        <img src="img territorios/Territorio 57.png" width="600"/>
        </details><details>
            <summary>Territorio 58</summary>
            <img src="img territorios/Territorio 58.png" width="600"/>
        </details><details>
            <summary>Territorio 59</summary>
            <img src="img territorios/Territorio 59.png" width="600"/>
        </details><details>
            <summary>Territorio 60</summary>
               <img src="img territorios/Territorio 60.png" width="600"/>
        </details><details>
            <summary>Territorio 61</summary>
                <img src="img territorios/Territorio 61.png" width="600"/>
        </details><details>
            <summary>Territorio 62</summary>
        <img src="img territorios/Territorio 62.png" width="600"/>
        </details><details>
            <summary>Territorio 63</summary>
        <img src="img territorios/Territorio 63.png" width="600"/>
        </details><details>
            <summary>Territorio 64</summary>
        <img src="img territorios/Territorio 64.png" width="600"/>
        </details><details>
            <summary>Territorio 65</summary>
        <img src="img territorios/Territorio 65.png" width="600"/>
        </details><details>
            <summary>Territorio 66</summary>
        <img src="img territorios/Territorio 66.png" width="600"/>
        </details><details>
            <summary>Territorio 67</summary>
        <img src="img territorios/Territorio 67.png" width="600"/>
        </details><details>
            <summary>Territorio 68</summary>
        <img src="img territorios/Territorio 68.png" width="600"/>
        </details><details>
            <summary>Territorio 69</summary>
        <img src="img territorios/Territorio 69.png" width="600"/>
        </details><details>
            <summary>Territorio 70</summary>
        <img src="img territorios/Territorio 70.png" width="600"/>
        </details><details>
            <summary>Territorio 71</summary>
        <img src="img territorios/Territorio 71.png" width="600"/>
        </details><details>
            <summary>Territorio 72</summary>
        <img src="img territorios/Territorio 72.png" width="600"/>
        </details><details>
            <summary>Territorio 73</summary>
        <img src="img territorios/Territorio 73.png" width="600"/>
        </details><details>
            <summary>Territorio 74</summary>
        <img src="img territorios/Territorio 74.png" width="600"/>
        </details><details>
            <summary>Territorio 75</summary>
            <img src="img territorios/Territorio 75.png" width="600"/>
        </details><details>
            <summary>Territorio 76</summary>
            <img src="img territorios/Territorio 76.png" width="600"/>
        </details><details>
            <summary>Territorio 77</summary>
            <img src="img territorios/Territorio 77.png" width="600"/>
        </details><details>
            <summary>Territorio 78</summary>
            <img src="img territorios/Territorio 78.png" width="600"/>
        </details><details>
            <summary>Territorio 79</summary>
            <img src="img territorios/Territorio 79.png" width="600"/>
        </details><details>
            <summary>Territorio 80</summary>
            <img src="img territorios/Territorio 80.png" width="600"/>
        </details><details>
            <summary>Territorio 81</summary>
            <img src="img territorios/Territorio 81.png" width="600"/>
        </details>

    </div>
</div>
  );
}

export default NoVisitar;
