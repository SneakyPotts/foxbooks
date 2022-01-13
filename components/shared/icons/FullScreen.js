import React from 'react';

const FullScreen = ({classNames}) => {
	return (
		<div>
			<svg className={classNames} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M15.1706 6.94398C15.0203 7.08404 14.8215 7.16029 14.616 7.15666C14.4106 7.15304 14.2147 7.06982 14.0694 6.92456C13.9241 6.77929 13.8409 6.5833 13.8373 6.3779C13.8337 6.17249 13.9099 5.97369 14.05 5.82339L17.3219 2.55251L15.0078 2.55251C14.8162 2.55251 14.631 2.48312 14.4866 2.35718C14.3422 2.23125 14.2483 2.05729 14.2223 1.86747L14.2149 1.75964C14.2149 1.54935 14.2984 1.34768 14.4471 1.19899C14.5958 1.0503 14.7975 0.966762 15.0078 0.966762L19.2364 0.966762C19.4467 0.966762 19.6484 1.0503 19.7971 1.19899C19.9458 1.34768 20.0293 1.54935 20.0293 1.75964L20.0293 5.98831C20.0293 6.19859 19.9458 6.40026 19.7971 6.54895C19.6484 6.69765 19.4467 6.78118 19.2364 6.78118C19.0261 6.78118 18.8245 6.69765 18.6758 6.54895C18.5271 6.40026 18.4435 6.19859 18.4435 5.98831L18.4435 3.67311L15.1706 6.94398ZM6.01655 0.966761C6.22683 0.966761 6.4285 1.0503 6.5772 1.19899C6.72589 1.34768 6.80942 1.54935 6.80942 1.75964C6.80942 1.96992 6.72589 2.17159 6.5772 2.32028C6.4285 2.46898 6.22683 2.55251 6.01655 2.55251L3.70558 2.55251L6.97328 5.82339C7.10756 5.95763 7.18921 6.13561 7.20337 6.32496C7.21753 6.51431 7.16327 6.70245 7.05046 6.85518L6.97328 6.94398C6.82462 7.09246 6.6231 7.17586 6.41299 7.17586C6.20287 7.17586 6.00135 7.09246 5.85269 6.94398L2.58075 3.671L2.58075 5.98831C2.58075 6.1799 2.51136 6.36502 2.38542 6.50942C2.25949 6.65381 2.08553 6.74772 1.89571 6.77378L1.78788 6.78118C1.5776 6.78118 1.37592 6.69765 1.22723 6.54895C1.07854 6.40026 0.995004 6.19859 0.995004 5.98831L0.995004 1.75964C0.995004 1.54935 1.07854 1.34768 1.22723 1.19899C1.37592 1.0503 1.5776 0.966761 1.78788 0.966761L6.01655 0.966761ZM15.0078 20C14.7975 20 14.5958 19.9165 14.4471 19.7678C14.2984 19.6191 14.2149 19.4174 14.2149 19.2071C14.2149 18.9968 14.2984 18.7952 14.4471 18.6465C14.5958 18.4978 14.7975 18.4142 15.0078 18.4142L17.3198 18.4142L14.05 15.1423C13.9158 15.0079 13.8344 14.8299 13.8204 14.6405C13.8065 14.4512 13.8609 14.2631 13.9738 14.1105L14.051 14.0207C14.1997 13.8722 14.4012 13.7888 14.6113 13.7888C14.8214 13.7888 15.0229 13.8722 15.1716 14.0207L18.4435 17.2968L18.4435 14.9785C18.4436 14.7869 18.5129 14.6017 18.6389 14.4573C18.7648 14.3129 18.9388 14.219 19.1286 14.193L19.2364 14.1856C19.4467 14.1856 19.6484 14.2691 19.7971 14.4178C19.9458 14.5665 20.0293 14.7682 20.0293 14.9785L20.0293 19.2071C20.0293 19.4174 19.9458 19.6191 19.7971 19.7678C19.6484 19.9165 19.4467 20 19.2364 20L15.0078 20ZM1.78788 20C1.57759 20 1.37592 19.9165 1.22723 19.7678C1.07854 19.6191 0.995003 19.4174 0.995003 19.2071L0.995003 14.9785C0.995003 14.7682 1.07854 14.5665 1.22723 14.4178C1.37592 14.2691 1.5776 14.1856 1.78788 14.1856C1.99816 14.1856 2.19983 14.2691 2.34852 14.4178C2.49722 14.5665 2.58075 14.7682 2.58075 14.9785L2.58075 17.2947L5.85269 14.0217C5.98693 13.8874 6.16491 13.8058 6.35426 13.7916C6.54361 13.7775 6.73175 13.8317 6.88448 13.9445L6.97328 14.0217C7.12176 14.1704 7.20516 14.3719 7.20516 14.582C7.20516 14.7921 7.12176 14.9937 6.97328 15.1423L3.70452 18.4142L6.01655 18.4142C6.20815 18.4143 6.39326 18.4836 6.53766 18.6096C6.68205 18.7355 6.77596 18.9095 6.80202 19.0993L6.80942 19.2071C6.80942 19.4174 6.72589 19.6191 6.57719 19.7678C6.4285 19.9165 6.22683 20 6.01655 20L1.78788 20Z" fill="#909190"/>
			</svg>
		</div>
	);
};

export default FullScreen;